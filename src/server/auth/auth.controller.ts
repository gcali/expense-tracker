import { Controller, Post, Request, Body, Get } from '@nestjs/common';
import { LocalAuth } from '@server/decorators/local-auth';
import { AuthService } from './auth.service';
import { CurrentUser } from '@server/decorators/current-user';
import { User } from '@server/models/user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('getme')
    public async getMe(@CurrentUser() { userName }: User) {
        return { userName };
    }

    @LocalAuth()
    @Post('login')
    public async login(@CurrentUser() { userName }: { userName: string }) {
        return this.authService.login(userName);
    }
}
