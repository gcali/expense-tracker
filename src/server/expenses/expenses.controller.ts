import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Expense, InputExpense } from '@common/dto/expense';
import { ExpensesService } from './expenses.service';
import { InsertResult, RemoveResult } from '@common/dto/api';

@Controller('expenses')
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService) { }

    @Get()
    public getExpenses(): Expense[] {
        return this.expensesService.getExpenses();
    }

    @Post()
    public insertExpense(@Body() expense: InputExpense): InsertResult {
        return {
            id: this.expensesService.insertExpense(expense),
            isOk: true,
        };
    }
    @Delete(':id')
    public removeExpense(@Param('id', new ParseIntPipe()) id: number): RemoveResult {
        return {
            hasRemoved: this.expensesService.removeExpense(id),
        };
    }
}
