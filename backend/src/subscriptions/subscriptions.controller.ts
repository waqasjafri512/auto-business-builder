import { Controller, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckout(@Request() req, @Body('organizationId') organizationId: string) {
    return this.subscriptionsService.createCheckoutSession(req.user.userId, organizationId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Request() req: RawBodyRequest<ExpressRequest>,
  ) {
    return this.subscriptionsService.handleWebhook(sig, (req as any).rawBody);
  }
}
