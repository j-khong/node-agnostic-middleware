import * as E from 'express';
const express = require('express');
import { buildRouter } from './router';
import { Routes } from '../../domain/routes';
import { HttpServer, buildServer as build } from '../../HttpServer';
import { Middleware, CallBack } from '../../middlewares/Middleware';
import { RouterErrorManager } from '../../middlewares/RouterErrorManager';

export function buildServer(hostname: string, port: number, routes: Routes[], middlewares: Middleware[]): HttpServer {
   const server = new ExpressServer(hostname, port);
   const router = buildRouter();
   const routerErrorManager = new RouterErrorManager(middlewareCallback);
   const routingConf = { router, routes, routerErrorManager };

   return build(server, routingConf, middlewares);
}

export const middlewareCallback = (cbToCall: CallBack) => {
   return (req: any, res: any, next: any) => {
      cbToCall({ request: req, response: res }, next)
         .then()
         .catch((e) => {
            console.log('middlewareCallback', e.message);
         });

      // return (req: any, res: any, next: any) => {
      //    new Promise((res: any, rej: any) => {
      //       this.router(req, res, next);
      //    })
      //       .then()
      //       .catch((e) => {
      //          console.log('getRouterCallback', e.message);
      //       });
      // };
   };
};

class ExpressServer extends HttpServer {
   private express: E.Express;
   constructor(hostname: string, port: number) {
      super(hostname, port);
      this.express = express();
   }

   getOnIncomingRequest(): any {
      //OnIncomingRequestCallback {
      for (const middleware of this.getMiddlewares()) {
         this.express.use(middleware.getCallback());
      }

      return this.express;
   }
}
