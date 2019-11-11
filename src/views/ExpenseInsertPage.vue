<template lang="pug">
.page
    .expense-insert
        .amount
            .label Amount
            input(
                type="number"
                :value="model.amount"
                @input="updateAmount($event.target.value)"
            )
        .description
            .label Description
            input(
                :value="model.description"
                @input="updateDescription($event.target.value)"
            )
        .owner
            .label Owner
            input(
                :value="model.owner"
                @input="updateOwner($event.target.value)"
            )
        .tags
            .label Tags
            input(
                :value="model.tags"
                @input="updateTags($event.target.value)"
            )
        button(@click="submit") Submit
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Expense } from '../model/expense';
import { StorageService } from '@/services/storageService';

interface ExpenseInputModel {
    amount?: number;
    description?: string;
    tags?: [];
    owner?: string;
}

export default class ExpenseInsertPage extends Vue {
    private model: ExpenseInputModel = {};
    private storageService: StorageService;

    constructor() {
        super();
        this.storageService = new StorageService();
    }

    public updateDescription = (value: string) => {
        this.model.description = value.trim();
    }

    public updateAmount = (value: string) => {
        console.log(value);
        this.model.amount = parseFloat(value);
    }

    public updateOwner = (value: string) => {
        this.model.owner = value;
    }

    public updateTags = (value: string) => {
    }

    public submit = () => {
        if (this.validateModel(this.model)) {
            const serializableModel: Expense = {
                amount: this.model.amount!,
                description: this.model.description!,
                owner: this.model.owner!,
                tags: [],
            };
            this.storageService.saveExpense(serializableModel);
        } else {
            alert('Invalid entry');
        }
    }

    private validateModel = (model: ExpenseInputModel): boolean => {
        if (!model) {
            return false;
        }
        if (!model.amount) {
            return false;
        }

        if (!model.description) {
            return false;
        }
        if (!model.owner) {
            return false;
        }
        return true;
    }
}
</script>
