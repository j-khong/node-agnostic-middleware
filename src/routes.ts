import { Routes } from './server/domain/routes';
import { RequestContext } from './server/domain/messages';

export function getRoutes(envName: string) {
   const routes: Routes[] = [
      {
         rootUri: 'api/v1/',
         get: [
            {
               uri: '/',
               action: async (context: RequestContext) => {
                  return { msg: 'Hello World from ' + envName };
               },
            },
            {
               uri: '/ex',
               action: async (context: RequestContext) => {
                  throw new Error('exception to manage');
               },
            },
         ],
         post: [],
         put: [],
         delete: [],
      },
   ];

   return routes;
}
