"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const owner_controller_1 = require("./owner.controller");
describe('Owner Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [owner_controller_1.OwnerController],
        }).compile();
        controller = module.get(owner_controller_1.OwnerController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=owner.controller.spec.js.map