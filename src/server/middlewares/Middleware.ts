import { RequestContext } from '../domain/messages';

export type CallBack = (ctx: RequestContext, next: any) => Promise<void>;

export interface Middleware {
   getCallback(): any;
}
