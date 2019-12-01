import Vue from 'vue';
import Vuex, { Commit, Store } from 'vuex';
import { apiActions } from '@client/services/api';
import { setTimeoutAsync } from '@client/utils/async';
import { Expense, InputExpense } from '@common/dto/expense';

interface IsLoading {
    [key: string]: boolean;
}

export interface State {
    expenses: {
        data: Expense[],
        lastUpdate: Date | null,
    };
    masterData: {
        owners: string[],
    };
    loading: number;
    isLoading: IsLoading;
}

const withLoading = async <T>(commit: Commit, callback: () => Promise<T>): Promise<T> => {
    commit(mutationRegistry.addLoading);
    try {
        return await callback();
    } finally {
        commit(mutationRegistry.removeLoading);
    }
};

export const mutationRegistry = {
    addExpense: 'add-expense',
    addLoading: 'add-loading',
    removeLoading: 'remove-loading',
    setExpenseLoading: 'set-expense-loading',
    removeExpense: 'remove-expense',
    setExpenses: 'set-expenses',
    setOwners: 'set-owners',
};

export const actionRegistry = {
    saveExpense: 'save-expense',
    reloadExpenses: 'reload-expenses',
    removeExpense: 'remove-expense',
    loadOwners: 'load-owners',
};

Vue.use(Vuex);


export const store = new Vuex.Store<State>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        expenses: {
            data: [],
            lastUpdate: null,
        },
        masterData: {
            owners: [],
        },
        loading: 0,
        isLoading: {
            expenses: false,
        },
    },
    mutations: {
        [mutationRegistry.addExpense]: (state, expense: Expense) =>
            state.expenses.data.push(expense),
        [mutationRegistry.addLoading]: (state) =>
            state.loading++,
        [mutationRegistry.removeLoading]: (state) =>
            state.loading--,
        [mutationRegistry.setExpenseLoading]: (state, value: boolean) =>
            state.isLoading.expenses = value,
        [mutationRegistry.removeExpense]: (state, id: number) =>
            state.expenses.data = state.expenses.data.filter((e) => e.id !== id),
        [mutationRegistry.setExpenses]: (state, expenses: Expense[]) =>
            state.expenses.data = [...expenses],
        [mutationRegistry.setOwners]: (state, owners: string[]) => state.masterData.owners = [...owners],
    },
    actions: {
        [actionRegistry.saveExpense]: ({ commit, dispatch }, expense: InputExpense): Promise<void> => {
            return withLoading(commit, async () => {
                try {
                    const result = await apiActions.insertExpense(expense);
                    if (result.isOk) {
                        await dispatch(actionRegistry.reloadExpenses);
                        // commit(mutationRegistry.addExpense, { ...expense, id: result.id });
                    }
                } catch (e) {
                    console.error(e);
                }
            });
        },
        [actionRegistry.reloadExpenses]: ({ commit, state }): Promise<void> => {
            return withLoading(commit, async () => {
                if (!state.isLoading.expenses) {
                    commit(mutationRegistry.setExpenseLoading, true);
                    try {
                        const expenses = await apiActions.readExpenses();
                        commit(mutationRegistry.setExpenses, expenses);
                    } finally {
                        commit(mutationRegistry.setExpenseLoading, false);
                    }
                }
            });
        },
        [actionRegistry.removeExpense]: ({ commit, dispatch }, expenseID: number): Promise<boolean> => {
            return withLoading(commit, async () => {
                const result = await apiActions.removeExpense(expenseID);
                if (result) {
                    await dispatch(actionRegistry.reloadExpenses);
                }
                return result;
            });
        },
        [actionRegistry.loadOwners]: ({ commit }): Promise<void> => {
            return withLoading(commit, async () => {
                const owners: string[] = await apiActions.getOwners();
                commit(mutationRegistry.setOwners, owners);
            });
        },
    },
});

const polling = () => {
    store
        .dispatch(actionRegistry.reloadExpenses)
        .then(() => setTimeout(polling, 15000));
};

polling();
