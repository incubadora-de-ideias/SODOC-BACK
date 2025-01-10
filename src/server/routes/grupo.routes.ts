import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { groupService } from "../../modules/services/group";

export async function groups(app: FastifyInstance) {
  await BaseRoute.handle(app, groupService, "groups");
  app.get("/groups/user/:id_usuario", async (req, res) => {
    return groupService.getUserGroups(req, res);
  });
}