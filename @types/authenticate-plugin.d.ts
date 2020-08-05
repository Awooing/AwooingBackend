import * as fastify from "fastify";
import {IncomingMessage, Server, ServerResponse, FastifyRequest, FastifyReply } from "http";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    verifyGeneralUser : function(FastifyRequest, FastifyReply<unknown>, (err?: Error | undefined) => void) : Promise<unknown>
    verifyCouncilUser : function(FastifyRequest, FastifyReply<unknown>, (err?: Error | undefined) => void) : Promise<unknown>
  }
}