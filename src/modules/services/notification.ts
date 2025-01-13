import { BaseService } from "./base";
import { notificationValidations } from "../validations/notification";
import { notificationModel } from "../models/notification";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorsHandler } from "../errors/handler";

class NotificationService extends BaseService {
  model = notificationModel;
  createValidationSchema = notificationValidations.getData;
  updateValidationSchema = notificationValidations.getDataToUpdate;

  async getByUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = notificationValidations.getUserId.parse(req.params);
      const userNotifications = await this.model.getByUser(userId);
      res.send(userNotifications);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
  async getUnreadCount(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = notificationValidations.getUserId.parse(req.params);
      const unreadNotifications = await this.model.getUnreadCount(
        userId
      );
      res.send(unreadNotifications);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
    async markAsRead(req: FastifyRequest, res: FastifyReply){
        try {
            const { id } = notificationValidations.getIdNotification.parse(req.params);
            const mark = await this.model.markAsread(id);
            return mark;
        } catch (error) {
            console.log("Erro ao marcar como lido!")
        }
    }
}

export const notificationService = new NotificationService();
