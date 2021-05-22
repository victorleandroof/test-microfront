import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        return request.session && request.session['user'];
    }
}
