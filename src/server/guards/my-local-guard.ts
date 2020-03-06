import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyLocalGuard extends AuthGuard('local') {

    constructor() {
        super();
    }
    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Hi!!!');
        const res = super.canActivate(context);
        (res as Promise<boolean>).then((e) => console.log(e)).catch((e) => console.log(e));
        return res;
    }
}

