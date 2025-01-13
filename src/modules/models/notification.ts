import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Notificacao } from "@prisma/client";

class NotificationModel extends BaseModel<Notificacao> {
  protected model = prisma.notificacao;
  protected include = {};

  async create(data: Omit<Notificacao, "id" | "data" | "lida">) {
    return this.model.create({
      data,
    });
  }
  async getByUser(userId: string) {
    return this.model.findMany({
      where: {
        id_usuario: userId,
      },
    });
  }
  async getUnreadCount(userId: string) {
    return this.model.count({
      where: {
        id_usuario: userId,
        lida: false,
      },
    });
  }
}

export const notificationModel = new NotificationModel();
