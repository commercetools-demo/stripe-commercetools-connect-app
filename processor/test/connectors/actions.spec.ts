import Stripe from 'stripe';
import { describe, test, expect, jest, afterEach, beforeEach } from '@jest/globals';
import * as Actions from '../../src/connectors/actions';
import * as Logger from '../../src/libs/logger';
import {
  mock_Stripe_retrieveWebhookEnpoints_response,
  mock_Stripe_updateWebhookEnpoints_response,
} from '../utils/mock-actions-data';

jest.mock('../../src/libs/logger');
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    webhookEndpoints: {
      retrieve: jest
        .fn<() => Promise<Stripe.Response<Stripe.WebhookEndpoint>>>()
        .mockResolvedValue(mock_Stripe_retrieveWebhookEnpoints_response),
      update: jest
        .fn<() => Promise<Stripe.Response<Stripe.WebhookEndpoint>>>()
        .mockResolvedValue(mock_Stripe_updateWebhookEnpoints_response),
    }
  })),
}));

describe('retrieveWebhookEndpoint', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should retrieve webhook endpoint information successfully', async () => {
    Stripe.prototype.webhookEndpoints = {
      retrieve: jest.fn(),
    } as unknown as Stripe.WebhookEndpointsResource;
    jest
      .spyOn(Stripe.prototype.webhookEndpoints, 'retrieve')
      .mockResolvedValue(mock_Stripe_retrieveWebhookEnpoints_response);

    const result = await Actions.retrieveWebhookEndpoint('we-11111');

    expect(Logger.log.info).toHaveBeenCalled();
    expect(Stripe.prototype.webhookEndpoints.retrieve).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  test('should throw an error when Stripe throws an error', async () => {
    Stripe.prototype.webhookEndpoints = {
      retrieve: jest.fn(),
    } as unknown as Stripe.WebhookEndpointsResource;
    jest.spyOn(Stripe.prototype.webhookEndpoints, 'retrieve').mockImplementation(() => {
      throw new Error('error');
    });

    expect(async () => {
      await Actions.retrieveWebhookEndpoint('we-11111');
    }).rejects.toThrow();
    expect(Logger.log.info).toHaveBeenCalled();
    expect(Logger.log.error).toHaveBeenCalled();
  });
});

describe('updateWebhookEndpoint', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should update webhook endpoint URL successfully', async () => {
    Stripe.prototype.webhookEndpoints = {
      update: jest.fn(),
    } as unknown as Stripe.WebhookEndpointsResource;
    jest
      .spyOn(Stripe.prototype.webhookEndpoints, 'update')
      .mockResolvedValue(mock_Stripe_updateWebhookEnpoints_response);

    await Actions.updateWebhookEndpoint('we_11111', 'https://myApp.com/stripe/webhooks');

    expect(Logger.log.info).toHaveBeenCalled();
    expect(Stripe.prototype.webhookEndpoints.update).toHaveBeenCalled();
  });

  test('should throw an error when Stripe throws an error', async () => {
    Stripe.prototype.webhookEndpoints = {
      update: jest.fn(),
    } as unknown as Stripe.WebhookEndpointsResource;
    jest.spyOn(Stripe.prototype.webhookEndpoints, 'update').mockImplementation(() => {
      throw new Error('error');
    });

    expect(async () => {
      await Actions.updateWebhookEndpoint('we_11111', 'https://myApp.com/stripe/webhooks');
    }).rejects.toThrow();
    expect(Logger.log.info).toHaveBeenCalled();
    expect(Logger.log.error).toHaveBeenCalled();
  });
});