import { Injectable } from '@nestjs/common';
import { Expense, InputExpense } from '@common/dto/expense';
import { ExpenseFilters } from '@common/dto/api';
import { ContextService } from '@server/context/context.service';

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

    constructor(private readonly contextService: ContextService) {
        console.log('Where the fuck am I?');
    }

    public removeExpense(id: number): boolean {
        const oldLength = this.expenses.length;
        this.expenses = this.expenses.filter((e) => e.id !== id);
        return oldLength !== this.expenses.length;
    }

    public getExpenses(filters: ExpenseFilters): Expense[] {
        let userName = this.contextService.getCurrentUser();
        if (userName) {
            userName = userName.toLowerCase();
        }
        return this
            .expenses
            .filter((e) => {
                if (filters.owner && e.owner.toLowerCase() !== filters.owner.toLowerCase()) {
                    return false;
                }
                if (filters.mineOnly === true && e.owner.toLowerCase() !== userName) {
                    return false;
                }
                return true;
            })
            .map((e) => ({ ...e }));
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
