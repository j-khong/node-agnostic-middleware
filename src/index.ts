import { getRoutes } from './routes';
import { getMiddlewares } from './middlewares';

const createAndStart = async (hostname: string, port: number, buildServer: any, middlewareCallback: any, envName: string) => {
   const routes = getRoutes(envName);
   const middlewares = getMiddlewares(middlewareCallback);

   const server = buildServer(hostname, port, routes, middlewares);
   await server.start();
   return server;
};
export { createAndStart };
