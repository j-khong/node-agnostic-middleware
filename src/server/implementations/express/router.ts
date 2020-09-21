import * as E from 'express';
import { Router, ProcessRoute } from '../../middlewares/Router';
import { Route, GetRoute, PostRoute, PutRoute, DeleteRoute } from '../../domain/routes';
import { IncomingMessage, ServerResponse } from '../../domain/messages';

class CustomRouter extends Router {
   private router = E.Router();

   protected getRouterCallback() {
      return this.router;
   }

   protected plugGetRoute(route: GetRoute, processRoute: ProcessRoute<GetRoute>): void {
      this.router.get(route.uri, (req: IncomingMessage, res: ServerResponse, next: any) => {
         processRoute(route, { params: [], request: req, response: res });
         // .then()
         // .catch((e) => {
         //    console.log('caught in router', e.message);
         //    // throw e;
         //    next(e);
         // });
      });
   }
   protected plugPostRoute(route: PostRoute, processRoute: ProcessRoute<PostRoute>): void {
      this.router.post(route.uri, (req: IncomingMessage, res: ServerResponse, next: any) => {
         processRoute(route, { request: req, response: res });
      });
   }
   protected plugPutRoute(route: PutRoute, processRoute: ProcessRoute<PutRoute>): void {
      this.router.put(route.uri, (req: IncomingMessage, res: ServerResponse, next: any) => {
         processRoute(route, { request: req, response: res });
      });
   }
   protected plugDeleteRoute(route: DeleteRoute, processRoute: ProcessRoute<DeleteRoute>): void {
      this.router.delete(route.uri, (req: IncomingMessage, res: ServerResponse, next: any) => {
         processRoute(route, { request: req, response: res });
      });
   }
}

export function buildRouter(): Router {
   return new CustomRouter();
}
