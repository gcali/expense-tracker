"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let OwnerService = class OwnerService {
    getAllOwners() {
        return [
            'Giovanni',
            'Francesca',
        ];
    }
};
OwnerService = tslib_1.__decorate([
    common_1.Injectable()
], OwnerService);
exports.OwnerService = OwnerService;
//# sourceMappingURL=owner.service.js.map