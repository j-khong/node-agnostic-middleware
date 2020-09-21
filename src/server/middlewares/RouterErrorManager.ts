import * as HttpStatus from 'http-status-codes';
import { Middleware } from './Middleware';
import { RequestContext } from '../domain/messages';

export class RouterErrorManager implements Middleware {
   constructor(private callback: any) {}

   getCallback() {
      ////mettre cette méthode dans RestResponseManager
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         console.log('passing in Route Error Manager');
         ctx.response.writeHead(HttpStatus.NOT_FOUND, { 'Content-Type': 'application/json' });
         ctx.response.end(
            JSON.stringify({
               status: 'error',
               message: 'unknown url ' + ctx.request.url,
            }),
         );
         await next();
      });
   }
   getInterfaceCallback(cbToCall: any) {
      return this.callback(cbToCall);
   }
}
