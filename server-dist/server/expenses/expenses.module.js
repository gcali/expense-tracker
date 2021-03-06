"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const expenses_controller_1 = require("./expenses.controller");
const expenses_service_1 = require("./expenses.service");
let ExpensesModule = class ExpensesModule {
};
ExpensesModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [expenses_controller_1.ExpensesController],
        providers: [expenses_service_1.ExpensesService]
    })
], ExpensesModule);
exports.ExpensesModule = ExpensesModule;
//# sourceMappingURL=expenses.module.js.map