import { Middleware } from './Middleware';
import { RequestContext } from '../domain/messages';

export class Logger extends Middleware {
   getCallback() {
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         const start = Date.now();
         await next();
         const ms = Date.now() - start;
         console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
      });
   }
}
