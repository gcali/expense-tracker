import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ContextService } from '@server/context/context.service';
import { AppModule } from '@server/app.module';
import { ContextModule } from '@server/context/context.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [ContextModule],
})
export class ExpensesModule { }
