"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ExpensesService = class ExpensesService {
    constructor() {
        this.expenses = [
            {
                amount: 14,
                description: 'Test',
                id: 1,
                owner: 'Giovanni',
                tags: [],
            },
        ];
        this.nextId = 2;
    }
    removeExpense(id) {
        const oldLength = this.expenses.length;
        this.expenses = this.expenses.filter((e) => e.id !== id);
        return oldLength !== this.expenses.length;
    }
    getExpenses() {
        return this.expenses.map((e) => (Object.assign({}, e)));
    }
    setExpenses(expenses) {
        this.expenses = expenses.map((e) => (Object.assign({}, e)));
    }
    insertExpense(expense) {
        const newExpense = Object.assign({ id: this.nextId++ }, expense);
        this.expenses.push(newExpense);
        return newExpense.id;
    }
};
ExpensesService = tslib_1.__decorate([
    common_1.Injectable()
], ExpensesService);
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map