import * as http from 'http';
import * as http2 from 'http2';

export type IncomingMessage = http.IncomingMessage | http2.Http2ServerRequest;
export type ServerResponse = http.ServerResponse | http2.Http2ServerResponse;

export interface RequestContext {
   request: IncomingMessage;
   response: ServerResponse;
   params?: { [key: string]: string }[];
}
