import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { notificationService } from "../../modules/services/notification";

export async function notifications(app: FastifyInstance) {
  await BaseRoute.handle(app, notificationService, "notifications");
  app.put('/notifications/markAsRead/:id', notificationService.markAsRead.bind(notificationService))
}