import { Expense, InputExpense } from '@common/dto/expense';
export declare class ExpensesService {
    private expenses;
    private nextId;
    removeExpense(id: number): boolean;
    getExpenses(): Expense[];
    setExpenses(expenses: Expense[]): void;
    insertExpense(expense: InputExpense): number;
}
