import { Module } from '@nestjs/common';
import { AppTestService } from './app-test.service';
import { AppTestController } from './app-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppTest, AppTestSchema } from './app-test.schema';

@Module({
  controllers: [AppTestController],
  providers: [AppTestService],
  imports: [
    MongooseModule.forFeature([{ name: AppTest.name, schema: AppTestSchema }]),
  ],
})
export class AppTestModule {}
