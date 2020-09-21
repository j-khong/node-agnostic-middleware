import { buildServer, middlewareCallback, envName } from './server/implementations/koa';
import { createAndStart } from './index';

createAndStart('localhost', 3003, buildServer, middlewareCallback, envName);
