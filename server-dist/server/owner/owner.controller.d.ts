import { OwnerService } from './owner.service';
export declare class OwnerController {
    private ownerService;
    constructor(ownerService: OwnerService);
    getOwners(): string[];
}
