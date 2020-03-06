"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const context_service_1 = require("@server/context/context.service");
let ExpensesService = class ExpensesService {
    constructor(contextService) {
        this.contextService = contextService;
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
        console.log('Where the fuck am I?');
    }
    removeExpense(id) {
        const oldLength = this.expenses.length;
        this.expenses = this.expenses.filter((e) => e.id !== id);
        return oldLength !== this.expenses.length;
    }
    getExpenses(filters) {
        let userName = this.contextService.getCurrentUser();
        if (userName) {
            userName = userName.toLowerCase();
        }
        return this
            .expenses
            .filter((e) => {
            if (filters.owner && e.owner.toLowerCase() !== filters.owner.toLowerCase()) {
                return false;
            }
            if (filters.mineOnly === true && e.owner.toLowerCase() !== userName) {
                return false;
            }
            return true;
        })
            .map((e) => (Object.assign({}, e)));
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
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [context_service_1.ContextService])
], ExpensesService);
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map