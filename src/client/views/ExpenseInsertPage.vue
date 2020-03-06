<template lang="pug">
.page
    .expense-insert
        .date
            .label Date
            input(
                type="date",
                :value="model.date",
                @input="updateDate($event.target.value)"
            )
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
            .input-elements
                select(
                    v-if="!flags.showCustomOwner"
                    :value="model.owner"
                    @input="updateOwner($event.target.value)"
                )
                    option(disabled, selected, value="")
                    option(v-for="owner in ownerList", :key="owner") {{owner}}
                input(
                    v-if="flags.showCustomOwner"
                    :value="model.owner",
                    @input="updateOwner($event.target.value)"
                )
                .manual-edit(
                    v-if="!flags.showCustomOwner"
                    @click="forceEdit()"
                ) ✎
        .tags(:style="{display: 'none'}")
            .label Tags
            input(
                :value="model.tags"
                @input="updateTags($event.target.value)"
            )
        button(@click="submit") Submit
</template>

<script lang="ts">

import { InputExpense, Expense } from '@common/dto/expense';
import { StorageService } from '@client/services/storageService';
import { StoreVue } from '@client/utils/base';
import { actionRegistry } from '../vuex/store';

import moment from 'moment';
import Vue from 'vue';

interface ExpenseInputModel {
    amount?: number;
    description?: string;
    tags?: [];
    owner?: string;
    date?: string;
}

const validateModel = (model: ExpenseInputModel): boolean => {
    if (!model) {
        return false;
    }
    if (!model.amount) {
        return false;
    }

    if (!model.description) {
        return false;
    }
    if (!model.owner || model.owner === '') {
        return false;
    }
    return true;
};

const expenseInsertPageDin = Vue.extend({
    data() {
        return {
            flags: {
                showCustomOwner: false,
            },
            model: {
                date: moment().format('YYYY-MM-DD'),
                owner: '',
            } as ExpenseInputModel,
        };
    },
    computed: {
        ownerList(): string[] {
            return this.$store.strongState().masterData.owners;
        },
    },
    methods: {
        updateDescription(value: string) {
            this.model.description = value.trim();
        },
        updateAmount(value: string) {
            this.model.amount = parseFloat(value);
        },
        updateOwner(value: string) {
            this.model.owner = value;
        },
        updateTags(value: string) { },
        updateDate(value: string) {
            this.model.date = value;
        },
        forceEdit() {
            console.log('Force edit!');
            this.flags.showCustomOwner = true;
        },
        submit() {
            if (validateModel(this.model)) {
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
        },

    },
});

export default expenseInsertPageDin;

</script>

<style lang="scss" scoped>
.input-elements {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.manual-edit {
    min-width: 2em;
    cursor: pointer;
}
</style>
