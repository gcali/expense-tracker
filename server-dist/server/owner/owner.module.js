"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const owner_controller_1 = require("./owner.controller");
const owner_service_1 = require("./owner.service");
let OwnerModule = class OwnerModule {
};
OwnerModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [owner_controller_1.OwnerController],
        providers: [owner_service_1.OwnerService]
    })
], OwnerModule);
exports.OwnerModule = OwnerModule;
//# sourceMappingURL=owner.module.js.map