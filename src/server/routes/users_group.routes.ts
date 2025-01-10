import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { usersGroupsService } from "@/modules/services/users_group";

export async function usersGroups(app: FastifyInstance) {
  await BaseRoute.handle(app, usersGroupsService, "users_groups");
  app.get("/users_groups/group/:id_grupo", async (req, res) => {
    return usersGroupsService.getByGroup(req, res);
  });
  app.get("/users_groups/user/:id_usuario", async (req, res) => {
    return usersGroupsService.getGroupsByUser(req, res);
  });
  app.get("/users_groups/confirmation", async (req, res) => {
    usersGroupsService.groupConfirmation(req, res);
  });
}
