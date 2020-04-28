import Koa from 'koa';
import Koa_Router from 'koa-router';
import { Router, ProcessRoute } from '../../middlewares/Router';
import { Route, GetRoute, PostRoute, PutRoute, DeleteRoute } from '../../domain/routes';

class KoaRouter extends Router {
   private router: Koa_Router;

   constructor() {
      super();
      this.router = new Koa_Router();
   }

   protected getRouterCallback() {
      return this.router.routes();
   }

   protected plugGetRoute(route: GetRoute, processRoute: ProcessRoute<GetRoute>): void {
      this.router.get(route.uri, async (ctx: Koa.ParameterizedContext) => {
         // console.log('params', ctx.request.query);
         await processRoute(route, { params: [], request: ctx.req, response: ctx.res });
      });
   }
   protected plugPostRoute(route: PostRoute, processRoute: ProcessRoute<PostRoute>): void {
      this.router.post(route.uri, async (ctx: Koa.ParameterizedContext) => {
         await processRoute(route, { request: ctx.req, response: ctx.res });
      });
   }
   protected plugPutRoute(route: PutRoute, processRoute: ProcessRoute<PutRoute>): void {
      this.router.put(route.uri, async (ctx: Koa.ParameterizedContext) => {
         await processRoute(route, { request: ctx.req, response: ctx.res });
      });
   }
   protected plugDeleteRoute(route: DeleteRoute, processRoute: ProcessRoute<DeleteRoute>): void {
      this.router.delete(route.uri, async (ctx: Koa.ParameterizedContext) => {
         await processRoute(route, { request: ctx.req, response: ctx.res });
      });
   }
}

export function buildRouter(): Router {
   return new KoaRouter();
}
