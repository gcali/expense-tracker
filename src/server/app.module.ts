import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { OwnerModule } from './owner/owner.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { GlobalJwtGuard } from './guards/global-jwt.guard';
import { ContextService } from './context/context.service';
import { ContextModule } from './context/context.module';

@Module({
  imports: [ExpensesModule, OwnerModule, AuthModule, ContextModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalJwtGuard,
    },
  ],
})
export class AppModule { }
