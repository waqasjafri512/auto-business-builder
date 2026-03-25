import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  ownerId: string;

  @Prop({ default: 'FREE' })
  plan: string;

  @Prop()
  stripeCustomerId?: string;

  @Prop({ default: 'inactive' })
  subscriptionStatus: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

@Schema({ timestamps: true })
export class Membership extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', required: true })
  organizationId: string;

  @Prop({ default: 'MEMBER' })
  role: string;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
// Ensure uniqueness for [userId, organizationId]
MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
