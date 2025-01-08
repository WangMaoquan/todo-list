import { Injectable } from '@nestjs/common';
import { CreateAppTestDto } from './dto/create-app-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AppTest } from './app-test.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppTestService {
  constructor(
    @InjectModel(AppTest.name) private projectModel: Model<AppTest>,
  ) {}
  create(createAppTestDto: CreateAppTestDto): Promise<AppTest> {
    const createdTask = new this.projectModel(createAppTestDto);
    return createdTask.save();
  }

  async findAll(): Promise<AppTest[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<AppTest> {
    return this.projectModel.findById(id).exec();
  }
}
