import { Middleware } from './server/middlewares/Middleware';
import { Logger } from './server/middlewares/Logger';
import { ErrorManager } from './server/middlewares/ErrorManager';
import * as http from 'http';
// import * as HttpErrors from 'http-errors';
// const createError = require('http-errors');
import * as HttpStatus from 'http-status-codes';
import { RequestContext } from './server/domain/messages';

export function getMiddlewares(CB: any) {
   // works only for koa now
   const middlewares: Middleware[] = [new Logger(CB), new ErrorManager(CB), new Stuff1(CB), new Stuff2(CB)];

   // const middlewares: Middleware[] = [];
   return middlewares;
}

//https://www.restapitutorial.com/httpstatuscodes.html

// app.use(function(req, res, next) {
//    next(createError(404));
//  });

//  // error handler
//  app.use(function(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get("env") === "development" ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.json({ error: "error" });
//  });

class RestResponseManager implements Middleware {
   getCallback() {
      return this.getInterfaceCallback(async (req: any, res: http.ServerResponse, result: any, next: any) => {
         console.log('passing in Rest Response Manager');

         if (req.method === 'GET') {
            res.writeHead(HttpStatus.ACCEPTED, { 'Content-Type': 'application/json' });
         }
         res.end(
            JSON.stringify({
               status: 'success',
               data: result,
            }),
         );
         await next();
      });
   }

   getInterfaceCallback(cbToCall: any) {
      return async (ctx: any, next: any) => {
         // console.log(ctx);
         await cbToCall(ctx.req, ctx.res, ctx.body, next);
      };
   }
}

class Stuff1 implements Middleware {
   constructor(private callback: any) {}
   getCallback() {
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         console.log(`stuff1`);
         await next();
      });
   }

   getInterfaceCallback(cbToCall: any) {
      return this.callback(cbToCall);
   }
}
class Stuff2 implements Middleware {
   constructor(private callback: any) {}
   getCallback() {
      return this.getInterfaceCallback(async (ctx: RequestContext, next: any) => {
         console.log(`stuff2`);
         await next();
      });
   }

   getInterfaceCallback(cbToCall: any) {
      return this.callback(cbToCall);
   }
}
