import { StringUtils } from '@jkhong/devutils';
import * as http from 'http';
import { Middleware } from './middlewares/Middleware';
import { Router } from './middlewares/Router';
import { RouterErrorManager } from './middlewares/RouterErrorManager';
// import { IncomingMessage, ServerResponse } from './domain/messages';
import { Action, Route, GetRoute, PostRoute, PutRoute, DeleteRoute } from './domain/routes';
import { Routes } from './domain/routes';

export function buildServer(
   server: HttpServer,
   routingConf: { router: Router; routes: Routes[]; routerErrorManager: RouterErrorManager },
   middlewares: Middleware[],
): HttpServer {
   for (const middleware of middlewares) {
      server.use(middleware);
   }

   const { router, routes, routerErrorManager } = routingConf;
   plugRoutes(router, routes);

   server.use(router);
   server.use(routerErrorManager);

   return server;
}

function plugRoutes(router: Router, routes: Routes[]) {
   for (const routePack of routes) {
      initRouter<GetRoute>(
         GetRoute,
         (route: GetRoute) => {
            router.get(route);
         },
         routePack.rootUri,
         routePack.get,
      );
      initRouter<PostRoute>(
         PostRoute,
         (route: PostRoute) => {
            router.post(route);
         },
         routePack.rootUri,
         routePack.post,
      );
      initRouter<PutRoute>(
         PutRoute,
         (route: PutRoute) => {
            router.put(route);
         },
         routePack.rootUri,
         routePack.put,
      );
      initRouter<DeleteRoute>(
         DeleteRoute,
         (route: DeleteRoute) => {
            router.delete(route);
         },
         routePack.rootUri,
         routePack.delete,
      );
   }
}
function initRouter<T extends Route>(
   type: new (uri: string, action: Action) => T,
   routerCB: (route: T) => void,
   rootUri: string | undefined,
   routes: T[],
) {
   for (const route of routes) {
      route.uri = concatUris(rootUri, route.uri);
      routerCB(new type(route.uri, route.action));
   }
}

const concatUris = (root: string | undefined, path: string) => {
   const slash = '/';
   let final = StringUtils.replaceLeading(path, slash, '');
   if (undefined !== root) {
      root = StringUtils.replaceTrailing(root, slash, '');
      final = `${root}/${final}`;
   }

   // make sure leading '/' is there
   final = '/' + StringUtils.replaceLeading(final, slash, '');
   return final;
};

export abstract class HttpServer {
   private app: http.Server | null = null;
   private middlewares: Middleware[] = [];
   constructor(private hostname: string, private port: number) {}

   start(): Promise<boolean> {
      return new Promise((resolve: (b: boolean) => void, reject: (err?: any) => void) => {
         this.app = http.createServer(this.getOnIncomingRequest());

         this.app.listen(this.getPort(), this.getHostname(), () => {
            console.log(`Server running at http://${this.getHostname()}:${this.getPort()}/`);
            resolve(true);
         });
      });
   }

   use(middleware: Middleware) {
      this.middlewares.push(middleware);
   }

   abstract getOnIncomingRequest(): any; //OnIncomingRequestCallback | http.ServerOptions;

   protected getHostname(): string {
      return this.hostname;
   }
   protected getPort(): number {
      return this.port;
   }
   protected getMiddlewares(): Middleware[] {
      return this.middlewares;
   }
}

// export type OnIncomingRequestCallback = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
