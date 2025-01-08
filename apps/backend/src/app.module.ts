import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppTestModule } from './app-test/app-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: 'todolist', // 不提供会默认访问 test
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
    }),
    AppTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
