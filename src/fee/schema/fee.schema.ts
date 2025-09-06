import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FeeStructure extends Document {
  @Prop({ required: true })
  title: string; // e.g., "Grade 7 - 2024 Fee Plan"

  @Prop({ type: [{ name: String, amount: Number, frequency: String }] })
  components: {
    name: string; // Tuition, Transport, Lab, etc.
    amount: number; // Fee amount
    frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  }[];

  @Prop({ default: 0 })
  admissionFee: number;

  @Prop({ default: 0 })
  securityDeposit: number;

  @Prop({ type: [{ description: String, amount: Number }] })
  discounts: {
    description: string; // "Sibling Discount", "Scholarship"
    amount: number; // flat discount or percentage (you decide)
  }[];

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId; // Link fee structure to a specific class

  @Prop({ default: true })
  isActive: boolean;
}

export const FeeStructureSchema = SchemaFactory.createForClass(FeeStructure);
export type FeeStructureDocument = FeeStructure & Document;
