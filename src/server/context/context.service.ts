import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
    constructor(@Inject(REQUEST) private readonly request: any) {
        console.log('Hello!');
        console.log(request);
    }

    public getCurrentUser(): string | null {
        console.log(this.request);
        if (this.request && this.request.user && this.request.user.userName) {
            return this.request.user.userName;
        } else {
            return null;
        }
    }
}
