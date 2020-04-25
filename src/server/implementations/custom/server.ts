import * as http from 'http';
import * as http2 from 'http2';

const url = require('url');
import { HttpServer, OnIncomingRequestCallback, buildServer as build } from '../../HttpServer';
import { Middleware } from '../../Middleware';
import { buildRouter } from './router';

export function buildServer(hostname: string, port: number, routes: any[], middlewares: Middleware[]): HttpServer {
   return build(new CustomServer(hostname, port), buildRouter(), routes, middlewares);
}

class CustomServer extends HttpServer {
   constructor(hostname: string, port: number) {
      super(hostname, port);
   }

   async getOnIncomingRequest(): Promise<any> {
      const cb: OnIncomingRequestCallback = async (
         req: http.IncomingMessage | http2.Http2ServerRequest,
         res: http.ServerResponse | http2.Http2ServerResponse,
      ): Promise<void> => {
         //  console.log('req:', req.headers, req.url);
         const queryObject = url.parse(req.url, true); //.query;
         //  console.log(queryObject);

         let body = '';
         req.on('data', (chunk) => {
            body += chunk;
         });
         let msg = 'Hello Worldy';
         req.on('end', async () => {
            console.log(`[${body}]`);
            for (const middlew of this.getMiddlewares()) {
               const cb = middlew.getCallback();
               msg = await cb(req);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // s.write('OK');
            // s.end();
            res.end(msg);
         });
      };
      return cb;
   }
}
