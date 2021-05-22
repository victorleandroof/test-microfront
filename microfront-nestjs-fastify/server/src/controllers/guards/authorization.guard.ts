import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import * as secureSession from 'fastify-secure-session';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const session: secureSession.Session = request.session;
    return session && session.get('user');
  }
}