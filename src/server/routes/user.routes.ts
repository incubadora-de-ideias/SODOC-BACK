import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { documentService } from "../../modules/services/documents";
import { userService } from "../../modules/services/user";

export async function users(app: FastifyInstance) {
  await BaseRoute.handle(app, userService, "user");
}
