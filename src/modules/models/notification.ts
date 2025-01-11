import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Notificacao } from "@prisma/client";

class NotificationModel extends BaseModel<Notificacao> {
    protected model = prisma.notificacao;
    protected include = {};

    async create(data: Omit<Notificacao, "id" | "data" | "lida">) {
        return this.model.create({
            data
        })
    }
    async markAsread(id: string){
        const update =  await this.model.update({
            where: { id },
            data: {lida: true}
        });
        return update;
    }
}

export const notificationModel = new NotificationModel();