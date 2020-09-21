import { buildServer, middlewareCallback, envName } from './server/implementations/custom';
import { createAndStart } from './index';

createAndStart('localhost', 3001, buildServer, middlewareCallback, envName);
