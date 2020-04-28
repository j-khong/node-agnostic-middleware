import { Middleware } from './Middleware';
import { RequestContext } from '../domain/messages';

export class Logger implements Middleware {
   constructor(private callback: any) {}

   getCallback() {
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         const start = Date.now();
         await next();
         const ms = Date.now() - start;
         console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
      });
   }

   getInterfaceCallback(cbToCall: any) {
      return this.callback(cbToCall);
   }
}
