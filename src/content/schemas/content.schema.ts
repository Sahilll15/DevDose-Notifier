import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  topicArea: string;

  @Prop({ required: true })
  generatedAt: Date;

  @Prop({ default: false })
  isUsed: boolean;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
