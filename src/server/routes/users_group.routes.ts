import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { documentService } from "../../modules/services/documents";
import { userService } from "../../modules/services/user";
import { usersGroupsService } from "@/modules/services/users_group";

export async function usersGroups(app: FastifyInstance) {
  await BaseRoute.handle(app, usersGroupsService, "users_groups");
  app.get("/users_groups/user/:id_usuario", async (req, res) => {
    return usersGroupsService.getGroupsByUser(req, res);
  });
}
