import { Expense, InputExpense } from '@/model/expense';

export class StorageService {

    private readonly serializationKey = 'expense-list';
    public removeExpense(expenseID: number): boolean {
        const existing = this.loadExpenses();
        const newExpenses = existing.filter((e) => e.id !== expenseID);
        this.store(newExpenses);
        return existing.length !== newExpenses.length;
    }
    public saveExpense(expense: InputExpense): number {
        const existing = localStorage.getItem(this.serializationKey);
        const list = (existing ? JSON.parse(existing) : []) as Expense[];
        const id = this.nextId(list);
        list.push({ ...expense, id });
        this.store(list);
        return id;
    }

    public loadExpenses(): Expense[] {
        const existing = localStorage.getItem(this.serializationKey);
        const list = (existing ? JSON.parse(existing) : []) as Expense[];
        return list;
    }

    private store(list: Expense[]) {
        const serialized = JSON.stringify(list);
        localStorage.setItem(this.serializationKey, serialized);
    }

    private nextId(expenseList: Expense[]): number {
        const expenses = expenseList;
        const ids = expenses.map((e) => e.id).filter((id) => id !== null).map((id) => id as number);
        return ids.reduce((acc, next) => next > acc ? next : acc, 0) + 1;
    }
}
