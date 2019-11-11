import Vuex, { Commit } from 'vuex';
import { Expense } from '@/model/expense';
import { actions } from '@/services/api';

export interface State {
    expenses: Expense[];
    loading: boolean;
}

const withLoading = async <T>(commit: Commit, callback: () => Promise<T>): Promise<T> => {
    commit('setLoading', true);
    try {
        return await callback();
    } finally {
        commit('setLoading', false);
    }
};

export const store = new Vuex.Store<State>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        expenses: [],
        loading: false,
    },
    mutations: {
        addExpense: (state, expense: Expense) => state.expenses.push(expense),
        setLoading: (state, value: boolean) => state.loading = value,
        removeExpense: (state, expense: Expense) => state.expenses = state.expenses.filter((e) => e !== expense),
        setExpenses: (state, expenses: Expense[]) => state.expenses = [...expenses],
    },
    actions: {
        saveExpense: ({ commit }, expense: Expense): Promise<void> => {
            return withLoading(commit, async () => {
                commit('addExpense', expense);
                let hasSaved = false;
                try {
                    const result = await actions.insertExpense(expense);
                    hasSaved = result.isOk;
                } catch (e) {
                    console.error(e);
                }
                if (!hasSaved) {
                    commit('removeExpense', expense);
                }
            });
        },
        reloadExpenses: ({ commit }): Promise<void> => {
            return withLoading(commit, async () => {
                const expenses = await actions.readExpenses();
                commit('setExpenses', expenses);
            });
        },
    },
});
