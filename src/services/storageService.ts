import { Expense } from '@/model/expense';

export class StorageService {

    private readonly serializationKey = 'expense-list';
    public saveExpense(expense: Expense) {
        const existing = localStorage.getItem(this.serializationKey);
        const list = (existing ? JSON.parse(existing) : []) as Expense[];
        list.push(expense);
        const serialized = JSON.stringify(list);
        localStorage.setItem(this.serializationKey, serialized);
    }

    public loadExpenses(): Expense[] {
        const existing = localStorage.getItem(this.serializationKey);
        const list = (existing ? JSON.parse(existing) : []) as Expense[];
        return list;
    }
}
