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
import { Expense, InputExpense } from '../model/expense';
import { StorageService } from '@client/services/storageService';
import { StoreVue } from '@client/utils/base';
import { actionRegistry } from '../vuex/store';

interface ExpenseInputModel {
    amount?: number;
    description?: string;
    tags?: [];
    owner?: string;
}

export default class ExpenseInsertPage extends StoreVue {
    private model: ExpenseInputModel = {};

    public updateDescription = (value: string) => {
        this.model.description = value.trim();
    }

    public updateAmount = (value: string) => {
        this.model.amount = parseFloat(value);
    }

    public updateOwner = (value: string) => {
        this.model.owner = value;
    }

    public updateTags = (value: string) => {
    }

    public submit = () => {
        if (this.validateModel(this.model)) {
            const serializableModel: InputExpense = {
                amount: this.model.amount!,
                description: this.model.description!,
                owner: this.model.owner!,
                tags: [],
            };
            this.$store.dispatch(actionRegistry.saveExpense, serializableModel);
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
