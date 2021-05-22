import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerProvider extends Logger {}
