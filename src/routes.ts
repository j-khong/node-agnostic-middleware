import { Routes } from './server/HttpServer';

export function getRoutes(envName: string) {
   const routes: Routes[] = [
      {
         get: [
            {
               uri: '/*',
               action: async (params: any, request: any) => {
                  return 'Hello World from ' + envName;
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
