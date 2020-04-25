import { Middleware } from './Middleware';
export abstract class Router implements Middleware {
   abstract getCallback(): any;

   get(route: GetRoute) {
      this.getRoutes.push(route);
   }
   post(route: PostRoute) {
      this.postRoutes.push(route);
   }

   private getRoutes: GetRoute[] = [];
   private postRoutes: PostRoute[] = [];

   protected getGetRoutes(): GetRoute[] {
      return this.getRoutes;
   }
   protected getPostRoutes(): PostRoute[] {
      return this.postRoutes;
   }
}
export interface Route {
   // method: HttpMethod;
   uri: string;
   action: Action;
}
export interface GetRoute extends Route {}
export interface PostRoute extends Route {}
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
// typz ActionCallback = ()=>void;
type Action = (params: any, request: any /*, callback:ActionCallback*/) => any;
