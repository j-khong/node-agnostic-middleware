import { buildServer, middlewareCallback, envName } from './server/implementations/express';
import { createAndStart } from './index';

createAndStart('localhost', 3002, buildServer, middlewareCallback, envName);
