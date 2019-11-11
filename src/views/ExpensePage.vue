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
                .row(v-for="expense in expenseList")
                    .col {{expense.owner}}
                    .col {{expense.description}}
                    .col {{expense.amount}}
                    .col 
                        span(@click="removeExpense(expense.id)") X

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Expense } from '../model/expense';
import { StorageService } from '../services/storageService';

@Component({
    components: {},
})
export default class ExpensePage extends Vue {

    private expenseList?: Expense[] = [
        {
            amount: 12,
            description: 'Test',
            owner: 'Gio',
            tags: [],
        },
    ];
    private storageService: StorageService;

    constructor() {
        super();
        this.storageService = new StorageService();
    }

    public mounted() {
        this.expenseList = this.storageService.loadExpenses();
    }

    public removeExpense(expenseId: string) {
        alert('Removing ' + expenseId);
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