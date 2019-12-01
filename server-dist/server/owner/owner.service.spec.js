"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const owner_service_1 = require("./owner.service");
describe('OwnerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [owner_service_1.OwnerService],
        }).compile();
        service = module.get(owner_service_1.OwnerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=owner.service.spec.js.map