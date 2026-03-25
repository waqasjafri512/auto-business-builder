import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', required: true })
  organizationId: string;

  @Prop({ required: true })
  idea: string;

  @Prop()
  location?: string;

  @Prop()
  budget?: string;

  @Prop()
  industry?: string;

  @Prop({ type: Object })
  aiResponse?: Record<string, any>;

  @Prop({ default: 'DRAFT' })
  status: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
