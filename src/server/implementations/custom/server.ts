const url = require('url');
import { HttpServer, buildServer as build } from '../../HttpServer';
import { Middleware, CallBack } from '../../middlewares/Middleware';
import { buildRouter } from './router';
import { RouterErrorManager } from '../../middlewares/RouterErrorManager';
import { IncomingMessage, ServerResponse } from '../../domain/messages';

export function buildServer(hostname: string, port: number, routes: any[], middlewares: Middleware[]): HttpServer {
   const server = new CustomServer(hostname, port);
   const router = buildRouter();
   const routerErrorManager = new RouterErrorManager(middlewareCallback);
   const routingConf = { router, routes, routerErrorManager };

   return build(server, routingConf, middlewares);
}

export const middlewareCallback = (cbToCall: CallBack) => {
   return async (req: any, res: any, next: any) => {
      await cbToCall({ request: req, response: res }, next);
   };
};

class CustomServer extends HttpServer {
   private middlewareIndex: number = 0;
   constructor(hostname: string, port: number) {
      super(hostname, port);
   }

   getOnIncomingRequest(): any {
      return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
         // console.log('middleware length:', this.getMiddlewares().length);
         await this.doNext(req, res);
      };
   }

   private async doNext(req: IncomingMessage, res: ServerResponse) {
      console.log('getNext:', this.middlewareIndex);

      if (this.middlewareIndex < this.getMiddlewares().length) {
         const cb = this.getMiddlewares()[this.middlewareIndex++].getCallback();
         // console.log(cb);
         await cb(req, res, this.getNext(req, res));
         this.middlewareIndex = 0;
         return;
      }

      console.log("you've reached the end : no more middleware");
   }

   private getNext(req: IncomingMessage, res: ServerResponse) {
      return async () => {
         await this.doNext(req, res);
      };
   }
}
