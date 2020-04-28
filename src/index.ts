import { getRoutes } from './routes';
import { getMiddlewares } from './middlewares';

import { buildServer, middlewareCallback, envName } from './server/implementations/koa';
// import { buildServer, middlewareCallback, envName } from './server/implementations/express';
// import { buildServer, middlewareCallback, envName } from './server/implementations/custom';

const routes = getRoutes(envName);
const middlewares = getMiddlewares(middlewareCallback);

const server = buildServer('localhost', 3000, routes, middlewares);
server.start();

export default server;
