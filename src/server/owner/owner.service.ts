import { Injectable } from '@nestjs/common';
import { Owner } from '@common/dto/masterData';

@Injectable()
export class OwnerService {
    public getAllOwners(): string[] {
        return [
            'Giovanni',
            'Francesca',
        ];
    }
}
