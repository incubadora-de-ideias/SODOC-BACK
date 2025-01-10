import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { groupService } from "../../modules/services/group";

export async function groups(app: FastifyInstance) {
  await BaseRoute.handle(app, groupService, "groups");
}