import Koa from 'koa';
import { HttpServer, buildServer as build } from '../../HttpServer';
import { buildRouter } from './router';
import { Middleware } from '../../Middleware';

export function buildServer(hostname: string, port: number, routes: any[], middlewares: Middleware[]): HttpServer {
   return build(new KoaServer(hostname, port), buildRouter(), routes, middlewares);
}

class KoaServer extends HttpServer {
   private koa: Koa;
   constructor(hostname: string, port: number) {
      super(hostname, port);
      this.koa = new Koa();
   }

   async getOnIncomingRequest(): Promise<any> {
      //OnIncomingRequestCallback {
      for (const middleware of this.getMiddlewares()) {
         console.log('add koa middleware');
         this.koa.use(middleware.getCallback());
      }

      return await this.koa.callback();
   }
}
