import Stripe from 'stripe';
import { SessionHeaderAuthenticationHook } from '@commercetools/connect-payments-sdk';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  ConfigElementResponseSchema,
  ConfigElementResponseSchemaDTO,
  PaymentResponseSchema,
  PaymentResponseSchemaDTO,
} from '../dtos/mock-payment.dto';
import { log } from '../libs/logger';
import { stripeApi } from '../clients/stripe.client';
import { StripePaymentService } from '../services/stripe-payment.service';
import { StripeHeaderAuthHook } from '../libs/fastify/hooks/stripe-header-auth.hook';
import { Type } from '@sinclair/typebox';
import { getConfig } from '../config/config';

type PaymentRoutesOptions = {
  paymentService: StripePaymentService;
  sessionHeaderAuthHook: SessionHeaderAuthenticationHook;
};

type StripeRoutesOptions = {
  paymentService: StripePaymentService;
  stripeHeaderAuthHook: StripeHeaderAuthHook;
};

export const paymentRoutes = async (fastify: FastifyInstance, opts: FastifyPluginOptions & PaymentRoutesOptions) => {
  fastify.get<{ Reply: PaymentResponseSchemaDTO }>(
    '/payments',
    {
      preHandler: [opts.sessionHeaderAuthHook.authenticate()],
      schema: {
        response: {
          200: PaymentResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const resp = await opts.paymentService.createPaymentIntentStripe();

      return reply.status(200).send(resp);
    },
  );
};

export const stripeWebhooksRoutes = async (fastify: FastifyInstance, opts: StripeRoutesOptions) => {
  fastify.post<{ Body: string; Reply: any }>(
    '/stripe/webhooks',
    {
      preHandler: opts.stripeHeaderAuthHook.authenticate(),
      config: { rawBody: true },
    },
    async (request, reply) => {
      const signature = request.headers['stripe-signature'] as string;

      let event: Stripe.Event;

      const stripeWebhookSecret = getConfig().stripeWebhookSecret;

      if (stripeWebhookSecret === '') {
        const errorMsg =
          'The Stripe Webhook Signing Secret is not configured, therefore events can not be accepted. Update this env var in the deployment and execute a redeploy.';
        log.error(errorMsg);
        return reply.status(400).send(`Webhook Error: ${errorMsg}`);
      } else {
        try {
          event = await stripeApi().webhooks.constructEvent(request.rawBody as string, signature, stripeWebhookSecret);
        } catch (err: any) {
          log.error(JSON.stringify(err));
          return reply.status(400).send(`Webhook Error: ${err.message}`);
        }
      }

      switch (event.type) {
        case 'payment_intent.payment_failed':
          // Payment intent has failed
          log.info('--->>> payment_intent.payment_failed');
          break;
        case 'payment_intent.succeeded':
          log.info(`Handle ${event.type} event of ${event.data.object.id}`);
          opts.paymentService.chargePaymentInCt(event);
          break;
        case 'charge.succeeded':
          log.info(`Handle ${event.type} event of ${event.data.object.id}`);
          opts.paymentService.authorizePaymentInCt(event);
          break;
        case 'charge.refunded':
          log.info(`Handle ${event.type} event of ${event.data.object.id}`);
          opts.paymentService.refundPaymentInCt(event);
          break;
        case 'payment_intent.canceled':
          log.info(`Handle ${event.type} event of ${event.data.object.id}`);
          opts.paymentService.cancelAuthorizationInCt(event);
          break;
        default:
          // This event is not supported
          log.info(`--->>> This Stripe event is not supported: ${event.type}`);
          break;
      }

      return reply.status(200).send();
    },
  );
};

export const configElementRoutes = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions & PaymentRoutesOptions,
) => {
  fastify.get<{ Reply: ConfigElementResponseSchemaDTO; Params: { paymentComponent: string } }>(
    '/get-config-element/:paymentComponent',
    {
      preHandler: [opts.sessionHeaderAuthHook.authenticate()],
      schema: {
        params: {
          paymentComponent: Type.String(),
        },
        response: {
          200: ConfigElementResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { paymentComponent } = request.params;
      const resp = await opts.paymentService.getConfigElement(paymentComponent);

      return reply.status(200).send(resp);
    },
  );
};
