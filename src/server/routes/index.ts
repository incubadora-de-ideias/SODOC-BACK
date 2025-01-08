import { FastifyInstance } from "fastify";
import { authService } from "../../modules/services/auth";
import { userService } from "../../modules/services/user";

export default async function routes(app: FastifyInstance) {
    app.post("/auth/login", authService.login);
    app.post("/user", userService.create);
    app.register(async (privateRoute) => {
        privateRoute.delete("/auth/logout", authService.logout);
        privateRoute.addHook("preHandler", authService.authenticate);
    })
}