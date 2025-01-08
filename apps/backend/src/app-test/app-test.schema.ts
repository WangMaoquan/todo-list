import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppTestMongoDB = AppTest & Document;

@Schema({
  timestamps: {
    createdAt: 'createAt',
    updatedAt: 'updateAt',
  },
})
export class AppTest {
  @Prop({ required: true })
  name: string;
}

export const AppTestSchema = SchemaFactory.createForClass(AppTest);
