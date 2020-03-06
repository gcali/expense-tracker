"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const expenses_module_1 = require("./expenses/expenses.module");
const owner_module_1 = require("./owner/owner.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const global_jwt_guard_1 = require("./guards/global-jwt.guard");
const context_module_1 = require("./context/context.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [expenses_module_1.ExpensesModule, owner_module_1.OwnerModule, auth_module_1.AuthModule, context_module_1.ContextModule],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: global_jwt_guard_1.GlobalJwtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map