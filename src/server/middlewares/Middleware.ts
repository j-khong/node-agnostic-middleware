import { RequestContext } from '../domain/messages';

export type CallBack = (ctx: RequestContext, next: any) => Promise<void>;

export abstract class Middleware {
   constructor(private callback: any) {}

   abstract getCallback(): any;

   protected getInterfaceCallback(cbToCall: CallBack) {
      return this.callback(cbToCall);
   }
}
