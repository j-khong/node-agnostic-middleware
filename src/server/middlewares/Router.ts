import * as HttpStatus from 'http-status-codes';
import { Middleware } from './Middleware';
import { RequestContext, ServerResponse } from '../domain/messages';
import { Route, GetRoute, PostRoute, PutRoute, DeleteRoute } from '../domain/routes';

export abstract class Router extends Middleware {
   constructor() {
      super(() => {}); // router won't use getInterfaceCallback
   }
   get(route: GetRoute) {
      this.getRoutes.push(route);
   }
   post(route: PostRoute) {
      this.postRoutes.push(route);
   }
   put(route: PutRoute) {
      this.putRoutes.push(route);
   }
   delete(route: DeleteRoute) {
      this.deleteRoutes.push(route);
   }

   private getRoutes: GetRoute[] = [];
   private postRoutes: PostRoute[] = [];
   private putRoutes: PutRoute[] = [];
   private deleteRoutes: DeleteRoute[] = [];

   protected abstract getRouterCallback(): any;
   protected abstract plugGetRoute(route: GetRoute, callback: ProcessRoute<GetRoute>): void;
   protected abstract plugPostRoute(route: PostRoute, callback: ProcessRoute<PostRoute>): void;
   protected abstract plugPutRoute(route: PutRoute, callback: ProcessRoute<PutRoute>): void;
   protected abstract plugDeleteRoute(route: DeleteRoute, callback: ProcessRoute<DeleteRoute>): void;

   getCallback() {
      for (const route of this.getRoutes) {
         this.plugGetRoute(route, (route: GetRoute, ctx: RequestContext) => this.processGetRoute(route, ctx));
      }
      for (const route of this.postRoutes) {
         this.plugPostRoute(route, (route: PostRoute, ctx: RequestContext) => this.processPostRoute(route, ctx));
      }
      for (const route of this.putRoutes) {
         this.plugPutRoute(route, (route: PutRoute, ctx: RequestContext) => this.processPutRoute(route, ctx));
      }
      return this.getRouterCallback();
   }

   private async processGetRoute(route: GetRoute, ctx: RequestContext) {
      const result = await route.action(ctx);
      console.log('res is ', result);

      this.sendResponse(ctx.response, HttpStatus.OK, result); //
   }

   private async processPostRoute(route: PostRoute, ctx: RequestContext) {
      const result = await route.action(ctx);
      console.log('res is ', result);
      this.sendResponse(ctx.response, HttpStatus.CREATED, result); //
   }

   private async processPutRoute(route: PutRoute, ctx: RequestContext) {
      const result = await route.action(ctx);
      console.log('res is ', result);
      this.sendResponse(ctx.response, HttpStatus.OK, result); //
   }

   // TODO mettre cette méthode dans RestResponseManager
   private sendResponse(res: ServerResponse, code: number, result: any) {
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(
         JSON.stringify({
            status: 'success',
            data: result,
         }),
      );
   }
}
// type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type ProcessRoute<T extends Route> = (route: T, ctx: RequestContext) => Promise<void>;
