import { Router } from '../../Router';

class CustomRouter extends Router {
   getCallback() {
      return async (req: any) => {
         for (const route of this.getGetRoutes()) {
            return await route.action(null, null);
         }
      };
   }
}

export function buildRouter(): Router {
   return new CustomRouter();
}
