import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { userService } from "../../modules/services/user";

export async function users(app: FastifyInstance) {
  await BaseRoute.handle(app, userService, "user");
  app.get("/user/group/:id_grupo", async (req, res) => {
    return userService.getByGroup(req, res);
  });

}
