import { Injectable } from '@nestjs/common';
import { JwtPayload } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private users = [
        { userName: 'francesca', password: 'francesca-puzza' },
        { userName: 'giovanni', password: 'giovanni-bello' },
    ];

    constructor(private jwtService: JwtService) { }
    public login(userName: string) {
        const payload: JwtPayload = {
            username: userName,
            sub: userName,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public validateUser(userName: string, password: string): { userName: string } | null {
        const matching = this.users.filter(
            (u) => u.userName.toLowerCase() === userName.toLowerCase() && u.password === password,
        );
        if (matching.length !== 1) {
            return null;
        } else {
            return { userName: matching[0].userName };
        }
    }
}
