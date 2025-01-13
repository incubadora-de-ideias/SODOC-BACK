import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { notificationService } from "../../modules/services/notification";
import { taskService } from "@/modules/services/task";

export async function tasks(app: FastifyInstance) {
  await BaseRoute.handle(app, taskService, "task");

  app.get("/task/user/:id_usuario", taskService.getTasksByUser.bind(taskService));

  app.get(
    "/task/review/:id_usuario",
    taskService.getTasksToReview.bind(taskService)
  );
}
