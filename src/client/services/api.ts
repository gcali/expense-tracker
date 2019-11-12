import { Expense, InputExpense } from '@client/model/expense';
import { setTimeoutAsync } from '@client/utils/async';
import { StorageService } from './storageService';


export type InsertResult = { isOk: false } | { isOk: true, id: number };

const storageService = new StorageService();

export const apiActions = {
    insertExpense: async (expense: InputExpense): Promise<InsertResult> => {
        await setTimeoutAsync(2000);
        const serializedExpense = { ...expense };
        const id = storageService.saveExpense(serializedExpense);
        return { isOk: true, id };
    },
    readExpenses: async (): Promise<Expense[]> => {
        await setTimeoutAsync(2000);
        const expenses = storageService.loadExpenses();
        return expenses;
    },
    removeExpense: async (expenseID: number): Promise<boolean> => {
        await setTimeoutAsync(2000);
        return storageService.removeExpense(expenseID);
    },
};
