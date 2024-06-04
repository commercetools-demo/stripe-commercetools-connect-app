import Stripe from 'stripe';

export const mockEvent__paymentIntent_amountCapturableUpdated: Stripe.Event = {
  id: 'evt_11111',
  object: 'event',
  api_version: '2024-04-10',
  created: 1717093717,
  data: {
    object: {
      id: 'pi_11111',
      object: 'payment_intent',
      amount: 12300,
      amount_capturable: 12300,
      amount_details: {
        tip: {}
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'manual',
      client_secret: 'pi_22222',
      confirmation_method: 'automatic',
      created: 1717093717,
      currency: 'mxn',
      customer: null,
      description: 'Sport shoes',
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_11111',
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_11111',
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic'
        }
      },
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: 'Payment',
      statement_descriptor_suffix: null,
      status: 'requires_capture',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_11111',
    idempotency_key: '11111'
  },
  type: 'payment_intent.amount_capturable_updated'
}

export const mockEvent__paymentIntent_processing: Stripe.Event = {
  id: 'evt_00000000000',
  object: 'event',
  api_version: '2024-04-10',
  created: 1717093717,
  data: {
    object: {
      id: 'pi_11111',
      object: 'payment_intent',
      amount: 12300,
      amount_capturable: 12300,
      amount_details: {
        tip: {}
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'manual',
      client_secret: 'pi_22222',
      confirmation_method: 'automatic',
      created: 1717093717,
      currency: 'mxn',
      customer: null,
      description: 'Sport shoes',
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_11111',
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_11111',
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic'
        }
      },
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: 'Payment',
      statement_descriptor_suffix: null,
      status: 'requires_capture',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_11111',
    idempotency_key: '11111'
  },
  type: 'payment_intent.processing'
}

export const mockEvent__paymentIntent_paymentFailed: Stripe.Event = {
  id: 'evt_11111',
  object: 'event',
  api_version: '2024-04-10',
  created: 1717093717,
  data: {
    object: {
      id: 'pi_11111',
      object: 'payment_intent',
      amount: 12300,
      amount_capturable: 12300,
      amount_details: {
        tip: {}
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'manual',
      client_secret: 'pi_22222',
      confirmation_method: 'automatic',
      created: 1717093717,
      currency: 'mxn',
      customer: null,
      description: 'Sport shoes',
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_11111',
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_11111',
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic'
        }
      },
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: 'Payment',
      statement_descriptor_suffix: null,
      status: 'requires_capture',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_11111',
    idempotency_key: '11111'
  },
  type: 'payment_intent.payment_failed'
}

export const mockEvent__paymentIntent_succeeded: Stripe.Event = {
  id: 'evt_11111',
  object: 'event',
  api_version: '2024-04-10',
  created: 1717093717,
  data: {
    object: {
      id: 'pi_11111',
      object: 'payment_intent',
      amount: 12300,
      amount_capturable: 12300,
      amount_details: {
        tip: {}
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'manual',
      client_secret: 'pi_22222',
      confirmation_method: 'automatic',
      created: 1717093717,
      currency: 'mxn',
      customer: null,
      description: 'Sport shoes',
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_11111',
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_11111',
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic'
        }
      },
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: 'Payment',
      statement_descriptor_suffix: null,
      status: 'requires_capture',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_11111',
    idempotency_key: '11111'
  },
  type: 'payment_intent.succeeded'
}