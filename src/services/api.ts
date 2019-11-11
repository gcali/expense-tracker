import { Expense } from '@/model/expense';
import { setTimeoutAsync } from '@/utils/async';
import { StorageService } from './storageService';

export interface OperationResult {
    isOk: boolean;
}

const storageService = new StorageService();

export const actions = {
    insertExpense: async (expense: Expense): Promise<OperationResult> => {
        await setTimeoutAsync(2000);
        storageService.saveExpense(expense);
        return { isOk: true };
    },
    readExpenses: async (): Promise<Expense[]> => {
        await setTimeoutAsync(2000);
        const expenses = storageService.loadExpenses();
        return expenses;
    }
};
