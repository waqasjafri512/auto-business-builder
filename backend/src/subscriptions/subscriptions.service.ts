import { Injectable, RawBodyRequest, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class SubscriptionsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private orgService: OrganizationsService,
  ) {
    const key = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (key && key !== 'sk_test_51P...') {
      this.stripe = new Stripe(key);
    }
  }

  async createCheckoutSession(userId: string, organizationId: string) {
    if (!this.stripe) {
      throw new Error('Stripe is not configured. Please add STRIPE_SECRET_KEY to .env');
    }
    const org = await this.orgService.findOne(organizationId);
    
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: this.configService.get<string>('STRIPE_PRO_PRICE_ID'),
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get<string>('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/pricing`,
      client_reference_id: organizationId,
      customer_email: (org as any).email || undefined,
      metadata: { userId, organizationId },
    });

    return { url: session.url };
  }

  async handleWebhook(sig: string, payload: Buffer) {
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, sig, endpointSecret!);
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.client_reference_id;
      const stripeCustomerId = session.customer as string;

      if (organizationId) {
        await this.orgService.update(organizationId, {
          plan: 'PRO',
          stripeCustomerId,
          subscriptionStatus: 'active',
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const org = await this.orgService.findByStripeCustomerId(subscription.customer as string);
      if (org) {
        await this.orgService.update((org._id as any).toString(), {
          plan: 'FREE',
          subscriptionStatus: 'inactive',
        });
      }
    }

    return { received: true };
  }
}
