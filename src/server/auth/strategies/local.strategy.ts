import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userNotFound } from '@common/codes/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ session: false, usernameField: 'userName' });
    }
    public async validate(userName: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(userName, password);
        if (user === null) {
            throw new UnauthorizedException({ message: 'User not found', code: userNotFound });
        }
        return user;
    }
}
