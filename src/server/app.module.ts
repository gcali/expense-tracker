import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [ExpensesModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
