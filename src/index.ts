import { getRoutes } from './routes';
import { getMiddlewares } from './middlewares';

import { buildServer, envName } from './server/implementations/koa';
// import { buildServer, envName } from './server/implementations/express';
// import { buildServer, envName } from './server/implementations/custom';

const routes = getRoutes(envName);
const middlewares = getMiddlewares();

const server = buildServer('localhost', 3000, routes, middlewares);
server.start();
