import { Injectable } from '@nestjs/common';
import { Expense, InputExpense } from '@common/dto/expense';

@Injectable()
export class ExpensesService {
    private expenses: Expense[] = [
        {
            amount: 14,
            description: 'Test',
            id: 1,
            owner: 'Giovanni',
            tags: [],
        },
    ];

    private nextId: number = 2;

    public removeExpense(id: number): boolean {
        const oldLength = this.expenses.length;
        this.expenses = this.expenses.filter((e) => e.id !== id);
        return oldLength !== this.expenses.length;
    }

    public getExpenses(): Expense[] {
        return this.expenses.map((e) => ({ ...e }));
    }

    public setExpenses(expenses: Expense[]) {
        this.expenses = expenses.map((e) => ({ ...e }));
    }

    public insertExpense(expense: InputExpense): number {
        const newExpense = { id: this.nextId++, ...expense };
        this.expenses.push(newExpense);
        return newExpense.id;
    }
}
