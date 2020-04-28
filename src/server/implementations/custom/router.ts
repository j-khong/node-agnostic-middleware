import { StringUtils } from '@jkhong/devutils';
import { Router, ProcessRoute } from '../../middlewares/Router';
import { Route, GetRoute, PostRoute, PutRoute, DeleteRoute } from '../../domain/routes';
import { IncomingMessage, ServerResponse } from '../../domain/messages';

class CustomRouter extends Router {
   private routesMap: Map<string, any> = new Map<string, any>();

   protected getRouterCallback() {
      return async (req: IncomingMessage, res: ServerResponse, next: any) => {
         try {
            console.log("you've reached router", req.url);
            if (undefined !== req.url) {
               const url = StringUtils.replaceTrailing(req.url, '/', '');
               const cb = this.routesMap.get(url);
               if (undefined !== cb) {
                  console.log('calling call back of ', url);
                  await cb(req, res, next);
               } else {
                  console.log('no call back for ', url);
                  await next();
               }
            }
         } catch (e) {
            console.log('caught in router', e.message);
            await next();
         }
      };
   }

   protected plugGetRoute(route: GetRoute, processRoute: ProcessRoute<GetRoute>): void {
      const url = StringUtils.replaceTrailing(route.uri, '/', '');
      // console.log('plugging ', url);

      this.routesMap.set(url, (req: IncomingMessage, res: ServerResponse, next: any) => {
         processRoute(route, { params: [], request: req, response: res });
      });
   }
   protected plugPostRoute(route: PostRoute, processRoute: ProcessRoute<PostRoute>): void {}
   protected plugPutRoute(route: PutRoute, processRoute: ProcessRoute<PutRoute>): void {}
   protected plugDeleteRoute(route: DeleteRoute, processRoute: ProcessRoute<DeleteRoute>): void {}
}

export function buildRouter(): Router {
   return new CustomRouter();
}
