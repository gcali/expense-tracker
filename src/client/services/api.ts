import { setTimeoutAsync } from '@client/utils/async';
import { StorageService } from './storageService';
import { InputExpense, Expense } from '@common/dto/expense';
import { InsertResult, RemoveResult } from '@common/dto/api';
import { endpoints, defaultHeaders } from './endpoint';


const storageService = new StorageService();

export const apiActions = {
    insertExpense: async (expense: InputExpense): Promise<InsertResult> => {
        const result = await fetch(endpoints.insertExpense.url, {
            ...endpoints.insertExpense.defaultInit,
            body: JSON.stringify(expense),
        }).then((e) => e.json()) as InsertResult;
        return result;
    },
    readExpenses: async (): Promise<Expense[]> => {
        const result = await fetch(
            endpoints.listExpenses.url,
            endpoints.listExpenses.defaultInit,
        ).then((e) => e.json()) as Expense[];
        return result;
    },
    removeExpense: async (expenseID: number): Promise<boolean> => {
        const result = await fetch(
            endpoints.deleteExpense.url(expenseID),
            endpoints.deleteExpense.defaultInit,
        ).then((e) => e.json()) as RemoveResult;
        return result.hasRemoved;
    },
    getOwners: async (): Promise<string[]> => {
        const result = await fetch(
            endpoints.getOwners.url,
            endpoints.getOwners.defaultInit,
        ).then((e) => e.json()) as string[];
        return result;
    },
};
