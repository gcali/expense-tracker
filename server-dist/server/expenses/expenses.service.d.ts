import { Expense, InputExpense } from '@common/dto/expense';
import { ExpenseFilters } from '@common/dto/api';
import { ContextService } from '@server/context/context.service';
export declare class ExpensesService {
    private readonly contextService;
    private expenses;
    private nextId;
    constructor(contextService: ContextService);
    removeExpense(id: number): boolean;
    getExpenses(filters: ExpenseFilters): Expense[];
    setExpenses(expenses: Expense[]): void;
    insertExpense(expense: InputExpense): number;
}
