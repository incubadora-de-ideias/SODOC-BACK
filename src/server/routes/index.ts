import { FastifyInstance } from "fastify";
import { authService } from "../../modules/services/auth";
import { userService } from "../../modules/services/user";
import { users } from "./user.routes";
import { documents } from "./documents.routes";
import { groups } from "./grupo.routes";
import { notifications } from "./notification.routes";
import { uploads } from "./uploads-documents.routes";
import { works } from "./work.routes";
import { usersGroups } from "./users_group.routes";
import { tasks } from "./task.routes";

export default async function routes(app: FastifyInstance) {
    app.post("/login", authService.login);
    app.register(async (privateRoute) => {
        privateRoute.addHook("preHandler", authService.authenticate);
        privateRoute.delete("/logout", authService.logout);
        await users(privateRoute);
        await documents(privateRoute);
        await groups(privateRoute);
        await notifications(privateRoute);
        await uploads(privateRoute);
        await works(privateRoute);
        await usersGroups(privateRoute);
        await tasks(privateRoute);
    })
}