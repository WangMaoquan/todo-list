import { Controller, Get, Body, Param } from '@nestjs/common';
import { AppTestService } from './app-test.service';
import { AppTest } from './app-test.schema';

let i = 0;

@Controller('app-test')
export class AppTestController {
  constructor(private readonly appTestService: AppTestService) {}

  @Get()
  create() {
    return this.appTestService.create({
      name: `decade${i++}`,
    });
  }

  @Get('getAll')
  findAll() {
    return this.appTestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AppTest> {
    return this.appTestService.findOne(id);
  }
}
