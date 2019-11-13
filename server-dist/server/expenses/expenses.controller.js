"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const expenses_service_1 = require("./expenses.service");
let ExpensesController = class ExpensesController {
    constructor(expensesService) {
        this.expensesService = expensesService;
    }
    getExpenses() {
        return this.expensesService.getExpenses();
    }
    insertExpense(expense) {
        return {
            id: this.expensesService.insertExpense(expense),
            isOk: true,
        };
    }
    removeExpense(id) {
        return {
            hasRemoved: this.expensesService.removeExpense(id),
        };
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], ExpensesController.prototype, "getExpenses", null);
tslib_1.__decorate([
    common_1.Post(),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], ExpensesController.prototype, "insertExpense", null);
tslib_1.__decorate([
    common_1.Delete(':id'),
    tslib_1.__param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Object)
], ExpensesController.prototype, "removeExpense", null);
ExpensesController = tslib_1.__decorate([
    common_1.Controller('expenses'),
    tslib_1.__metadata("design:paramtypes", [expenses_service_1.ExpensesService])
], ExpensesController);
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map