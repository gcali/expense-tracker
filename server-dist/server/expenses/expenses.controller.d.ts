import { Expense, InputExpense } from '@common/dto/expense';
import { ExpensesService } from './expenses.service';
import { InsertResult, RemoveResult, ExpenseFilters } from '@common/dto/api';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    getExpenses(filters: ExpenseFilters): Expense[];
    insertExpense(expense: InputExpense): InsertResult;
    removeExpense(id: number): RemoveResult;
}
