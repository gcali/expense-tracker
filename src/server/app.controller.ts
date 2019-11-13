import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InputExpense } from '@common/dto/expense';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  public getHello(): InputExpense {
    return {
      amount: 14,
      description: 'test',
      owner: 'gio',
      tags: [],
    };
  }
}
