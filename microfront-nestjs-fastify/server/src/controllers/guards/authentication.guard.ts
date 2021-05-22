import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import * as secureSession from 'fastify-secure-session';

const users = {
    admin: {
        password: 'admin',
        name: 'admin'
    }
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const session: secureSession.Session = request.session;
    const token = request.query['token'];
    if(session.get('user')) return true;
    if(token) {
        const decodedToken = Buffer.from(token as string, 'base64').toString();
        const payloadToken = decodedToken.split(':');
        const user = users[payloadToken[0]];
        if(user.password === payloadToken[1]) {
            session.set('user',{
                name: user.name
            })
            return true;
        }
    }
  }
}