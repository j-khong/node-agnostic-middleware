import { buildServer, middlewareCallback, envName } from './server/implementations/express';
import { create } from './index';

create('localhost', 3000, buildServer, middlewareCallback, envName);
