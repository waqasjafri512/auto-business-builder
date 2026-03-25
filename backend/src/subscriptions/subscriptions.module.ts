import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OrganizationsModule, ConfigModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
