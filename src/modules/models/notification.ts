import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Notificacao, Prisma } from "@prisma/client";

class NotificationModel extends BaseModel<Notificacao> {
  protected model = prisma.notificacao;
  protected include = {};
  protected orderBy = {data: "asc" } as Prisma.NotificacaoOrderByWithRelationInput;

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
      orderBy:{
        data: "desc"
      }
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
  async markAsread(id: string){
      const update =  await this.model.update({
          where: { id },
          data: { lida: true }
      });
      return update;
  }
}

export const notificationModel = new NotificationModel();
