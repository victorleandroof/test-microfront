import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const users = {
    admin: {
        password: 'admin',
        name: 'admin',
    },
};

@Injectable()
export class AuthenticationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const { token } = request.query;
        if (request.session['user']) return true;
        if (token) {
            const decodedToken = Buffer.from(
                token as string,
                'base64'
            ).toString();
            const payloadToken = decodedToken.split(':');
            const user = users[payloadToken[0]];
            if (user.password === payloadToken[1]) {
                request.session['user'] = {
                    name: user.name,
                };
                return true;
            }
        }
    }
}
