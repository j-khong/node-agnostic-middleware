import * as HttpStatus from 'http-status-codes';
import { Middleware, CallBack } from './Middleware';
import { RequestContext, IncomingMessage, ServerResponse } from '../domain/messages';

export class ErrorManager implements Middleware {
   constructor(private callback: any) {}

   getCallback() {
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         console.log('passing in Error Manager');
         try {
            await next();
         } catch (e) {
            const req: IncomingMessage = ctx.request;
            const res: ServerResponse = ctx.response;
            console.log('caught in Error Manager', e);
            const exception: Error = e;
            console.log(req.method, req.url);

            let code = HttpStatus.INTERNAL_SERVER_ERROR;
            switch (req.method) {
               case 'GET':
                  code = HttpStatus.NOT_FOUND;
                  break;
               case 'POST':
               case 'PUT':
               case 'DELETE':
                  code = HttpStatus.BAD_REQUEST;
                  break;
            }
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(
               JSON.stringify({
                  status: 'error',
                  message: e.message,
               }),
            );
            console.log(exception.name);
            console.log(exception.message);
         }
      });
   }

   getInterfaceCallback(cbToCall: CallBack) {
      return this.callback(cbToCall);
   }
}
