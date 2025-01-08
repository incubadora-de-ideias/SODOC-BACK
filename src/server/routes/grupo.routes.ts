import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { groupService } from "../../modules/services/grupo";

export async function groups(app: FastifyInstance) {
  await BaseRoute.handle(app, groupService, "groups");
}