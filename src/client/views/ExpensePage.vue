<template lang="pug">
    .page
        h1.header Expense list
        .expense-table(v-if="expenseList")
            .expense-header.table-header
                .col Owner
                .col Description
                .col Amount
            .separator
            .content
                .row(v-for="expense in expenseList" :key="expense.id")
                    .col {{expense.owner}}
                    .col {{expense.description}}
                    .col {{expense.amount}}
                    .col 
                        span(@click="removeExpense(expense.id)") X

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { StoreVue } from '@client/utils/base';

import { Expense } from '../model/expense';
import { StorageService } from '../services/storageService';
import { State, actionRegistry } from '../vuex/store';

@Component({
    components: {},
})
export default class ExpensePage extends StoreVue {
    public get expenseList(): Expense[] {
        return this.$store.state.expenses.data;
    }

    public mounted() {
        this.$store.dispatch(actionRegistry.reloadExpenses);
    }

    public async removeExpense(expenseID: number) {
        const result: boolean = await this.$store.dispatch(actionRegistry.removeExpense, expenseID);
        if (!result) {
            alert('Could not remove expense');
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.expense-table {
    display: grid;
    border-collapse: collapse;
    grid-template-columns: repeat(4, 1fr);
}

.expense-header {
    border-bottom: 1px solid darkslategrey;
    font-weight: bold;
}

.expense-header,
.content,
.row {
    display: contents;
}

.separator {
    grid-column: 1/-1;
    border-bottom: 1px solid black;
    margin-bottom: 1em;
}
</style>