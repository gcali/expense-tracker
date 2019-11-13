import { setTimeoutAsync } from '@client/utils/async';
import { StorageService } from './storageService';
import { InputExpense, Expense } from '@common/dto/expense';
import { InsertResult, RemoveResult } from '@common/dto/api';


const storageService = new StorageService();

export const apiActions = {
    insertExpense: async (expense: InputExpense): Promise<InsertResult> => {
        const result = await fetch('http://localhost:3000/expenses', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((e) => e.json()) as InsertResult;
        return result;
        // await setTimeoutAsync(2000);
        // const serializedExpense = { ...expense };
        // const id = storageService.saveExpense(serializedExpense);
        // return { isOk: true, id };
    },
    readExpenses: async (): Promise<Expense[]> => {
        const result = await fetch('http://localhost:3000/expenses').then((e) => e.json()) as Expense[];
        return result;
        // await setTimeoutAsync(2000);
        // const expenses = storageService.loadExpenses();
        // return expenses;
    },
    removeExpense: async (expenseID: number): Promise<boolean> => {
        const result = await fetch('http://localhost:3000/expenses/' + expenseID, {
            method: 'DELETE',
        }).then((e) => e.json()) as RemoveResult;
        return result.hasRemoved;
        // await setTimeoutAsync(2000);
        // return storageService.removeExpense(expenseID);
    },
};
