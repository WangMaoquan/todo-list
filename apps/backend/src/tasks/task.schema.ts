import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './const';
import { Types } from 'mongoose';
import { Project } from 'src/projects/projects.schema';

@Schema({
  timestamps: {
    createdAt: 'createAt',
    updatedAt: 'updateAt',
  },
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ enum: Object.values(TaskStatus), default: TaskStatus.ACTIVE })
  status: TaskStatus;

  @Prop({ required: true, type: Types.ObjectId, ref: Project.name })
  projectId: Types.ObjectId;

  @Prop({ type: Number })
  position: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
