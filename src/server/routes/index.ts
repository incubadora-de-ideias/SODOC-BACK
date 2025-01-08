import { FastifyInstance } from "fastify";
import { authService } from "../../modules/services/auth";
import { userService } from "../../modules/services/user";
import { users } from "./user.routes";

export default async function routes(app: FastifyInstance) {
    app.post("/auth/login", authService.login);
    app.register(async (privateRoute) => {
        privateRoute.delete("/auth/logout", authService.logout);
        privateRoute.addHook("preHandler", authService.authenticate);
        await users(privateRoute);
    })
}