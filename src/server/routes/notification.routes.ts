import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { notificationService } from "../../modules/services/notification";

export async function notifications(app: FastifyInstance) {
  await BaseRoute.handle(app, notificationService, "notifications");
  app.get(
    "/notifications/user/:userId",
    notificationService.getByUser.bind(notificationService)
  );

  app.get(
    "/notifications/unread/:userId",
    notificationService.getUnreadCount.bind(notificationService)
  );
}
