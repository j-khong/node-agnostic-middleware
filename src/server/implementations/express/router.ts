import * as E from 'express';
import { Router } from '../../Router';

class CustomRouter extends Router {
   private router = E.Router();

   getCallback() {
      for (const route of this.getGetRoutes()) {
         this.router.get(route.uri, function (req, res, next) {
            route.action(null, null).then((result: any) => {
               res.send(result);
            });
         });
      }

      return this.router;
   }
}

export function buildRouter(): Router {
   return new CustomRouter();
}
