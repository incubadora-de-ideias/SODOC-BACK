import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { notificationService } from "../../modules/services/notification";
import { taskService } from "@/modules/services/task";

export async function tasks(app: FastifyInstance) {
  await BaseRoute.handle(app, taskService, "task");
}
