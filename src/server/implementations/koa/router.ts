import Koa from 'koa';
import Koa_Router from 'koa-router';
import { Router } from '../../Router';

class KoaRouter extends Router {
   private router: Koa_Router;

   constructor() {
      super();
      this.router = new Koa_Router();
   }
   getCallback() {
      this.processGetRoutes();
      // console.log('this.router.routes();:', this.router.routes());
      return this.router.routes();
   }

   private processGetRoutes() {
      for (const route of this.getGetRoutes()) {
         this.router.get(route.uri, async (ctx: Koa.ParameterizedContext) => {
            try {
               ctx.status = 201;
               ctx.body = await route.action(ctx.params, ctx.request);
               // {
               //    status: 'success',
               //    data: await route.action(ctx.params, ctx.request),
               // };
            } catch (err) {
               ctx.status = 404;
               ctx.body = {
                  status: 'error',
                  message: err,
               };
            }
         });
      }
   }
}

export function buildRouter(): Router {
   return new KoaRouter();
}
