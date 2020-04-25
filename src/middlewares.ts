import { Middleware } from './server/Middleware';

export function getMiddlewares() {
   // works only for koa now
   //    const middlewares: Middleware[] = [new Logger(), new Stuff1(), new Stuff2()];

   const middlewares: Middleware[] = [];
   return middlewares;
}
class Logger implements Middleware {
   getCallback() {
      // koa implementation
      return async (ctx: any, next: any) => {
         const start = Date.now();
         await next();
         const ms = Date.now() - start;
         console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
      };
   }
   //    getCallback() { // express implementation
   //       return async (req: any, res: any, next: any) => {
   //          console.log('Time:', Date.now());
   //          next();
   //       };
   //    }
}

class Stuff1 implements Middleware {
   getCallback() {
      // koa implementation
      return async (ctx: any, next: any) => {
         console.log(`stuff1`);
         await next();
      };
   }
   //    getCallback() { // express implementation
   //       return async (req: any, res: any, next: any) => {
   //          console.log('Time:', Date.now());
   //          next();
   //       };
   //    }
}
class Stuff2 implements Middleware {
   getCallback() {
      // koa implementation
      return async (ctx: any, next: any) => {
         console.log(`stuff2`);
         await next();
      };
   }
   //    getCallback() { // express implementation
   //       return async (req: any, res: any, next: any) => {
   //          console.log('Time:', Date.now());
   //          next();
   //       };
   //    }
}
