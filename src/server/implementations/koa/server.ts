import Koa from 'koa';
import { Routes } from '../../domain/routes';
import { HttpServer, buildServer as build } from '../../HttpServer';
import { buildRouter } from './router';
import { Middleware, CallBack } from '../../middlewares/Middleware';
import { RouterErrorManager } from '../../middlewares/RouterErrorManager';

export function buildServer(hostname: string, port: number, routes: Routes[], middlewares: Middleware[]): HttpServer {
   const server = new KoaServer(hostname, port);
   const router = buildRouter();
   const routerErrorManager = new RouterErrorManager(middlewareCallback);
   const routingConf = { router, routes, routerErrorManager };

   return build(server, routingConf, middlewares);
}

export const middlewareCallback = (cbToCall: CallBack) => {
   return async (ctx: any, next: any) => {
      await cbToCall({ request: ctx.req, response: ctx.res }, next);
   };
};

class KoaServer extends HttpServer {
   private koa: Koa;
   constructor(hostname: string, port: number) {
      super(hostname, port);
      this.koa = new Koa();
   }

   getOnIncomingRequest(): any {
      //OnIncomingRequestCallback {
      for (const middleware of this.getMiddlewares()) {
         // console.log('add koa middleware');
         this.koa.use(middleware.getCallback());
      }

      return this.koa.callback();
   }
}
