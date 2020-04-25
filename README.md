# 🚧 WIP project 🚧

# Purpose

creating a http server, agnostic regarding the middleware manager (koa, express, etc...)

```js
import { buildServer } from './server/implementations/koa';
// import { buildServer } from './server/implementations/express';
// import { buildServer } from './server/implementations/custom';

// getting routes definition, independent from the router, it is pure behavior code related to business
const routes = getRoutes();

// getting middleware definition, independent from technical middleware, it is pure behavior code related to business
const middlewares = getMiddlewares();

// simply build the server with the information a server needs
const server = buildServer('localhost', 3000, routes, middlewares);
server.start();
```
