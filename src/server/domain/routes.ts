import { RequestContext } from './messages';

export interface Routes {
   rootUri?: string;
   get: Route[];
   post: Route[];
   put: Route[];
   delete: Route[];
}

export interface Route {
   // method: HttpMethod;
   uri: string;
   action: Action;
}
export class GetRoute implements Route {
   constructor(public uri: string, public action: Action) {}
}
export class PostRoute implements Route {
   constructor(public uri: string, public action: Action) {}
}
export class PutRoute implements Route {
   constructor(public uri: string, public action: Action) {}
}
export class DeleteRoute implements Route {
   constructor(public uri: string, public action: Action) {}
}

export type Action = (context: RequestContext) => Promise<any>;
