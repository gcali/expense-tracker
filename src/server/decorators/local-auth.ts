import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public';
import { MyLocalGuard } from '@server/guards/my-local-guard';

// tslint:disable-next-line: variable-name
export const LocalAuth = () => ((target: any, key: string, descriptor: PropertyDescriptor): any => {
    Public()(target, key, descriptor);
    UseGuards(MyLocalGuard)(target, key, descriptor);
}
);
