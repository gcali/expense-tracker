import { Controller, Get } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner } from '@common/dto/masterData';

@Controller('owner')
export class OwnerController {
    constructor(private ownerService: OwnerService) { }

    @Get()
    public getOwners(): string[] {
        return this.ownerService.getAllOwners();
    }
}
