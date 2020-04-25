import * as http from 'http';
import * as http2 from 'http2';
import { Middleware } from './Middleware';
import { Router } from './Router';

export function buildServer(
   server: HttpServer,
   router: Router,
   routes: Routes[],
   middlewares: Middleware[],
): HttpServer {
   for (const middleware of middlewares) {
      server.use(middleware);
   }

   const concatUris = (root: string | undefined, path: string) => {
      if (undefined !== root) {
         return `${root}/${path}`;
      }
      return path;
   };
   for (const routePack of routes) {
      for (const getRoutes of routePack.get) {
         getRoutes.uri = concatUris(routePack.rootUri, getRoutes.uri);
         router.get(getRoutes);
      }
      for (const postRoutes of routePack.post) {
         postRoutes.uri = concatUris(routePack.rootUri, postRoutes.uri);
         router.post(postRoutes);
      }
   }

   server.use(router);

   return server;
}

export abstract class HttpServer {
   private app: http.Server | null = null;
   private middlewares: Middleware[] = [];
   constructor(private hostname: string, private port: number) {}

   async start() {
      this.app = http.createServer(await this.getOnIncomingRequest());

      this.app.listen(this.getPort(), this.getHostname(), () => {
         console.log(`Server running at http://${this.getHostname()}:${this.getPort()}/`);
      });
   }

   use(middleware: Middleware) {
      this.middlewares.push(middleware);
   }

   abstract async getOnIncomingRequest(): Promise<any>; //OnIncomingRequestCallback | http.ServerOptions;

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

export type OnIncomingRequestCallback = (
   req: http.IncomingMessage | http2.Http2ServerRequest,
   res: http.ServerResponse | http2.Http2ServerResponse,
) => Promise<void>;

export interface Routes {
   rootUri?: string;
   get: Route[];
   post: Route[];
   put: Route[];
   delete: Route[];
}

interface Route {
   uri: string;
   action: Action;
}
type Action = (params: any, request: any /*, callback:ActionCallback*/) => Promise<any>;
