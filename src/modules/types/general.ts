import { JWT } from "@fastify/jwt";

type UserPayload = {
  id: string;
  nome: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}

