import * as E from 'express';
const express = require('express');
import { buildRouter } from './router';

import { HttpServer, buildServer as build } from '../../HttpServer';
import { Middleware } from '../../Middleware';

export function buildServer(hostname: string, port: number, routes: any[], middlewares: Middleware[]): HttpServer {
   return build(new ExpressServer(hostname, port), buildRouter(), routes, middlewares);
}

class ExpressServer extends HttpServer {
   private express: E.Express;
   constructor(hostname: string, port: number) {
      super(hostname, port);
      this.express = express();
   }

   async getOnIncomingRequest(): Promise<any> {
      //OnIncomingRequestCallback {
      for (const middleware of this.getMiddlewares()) {
         this.express.use(middleware.getCallback());
      }

      return this.express;
   }
}
