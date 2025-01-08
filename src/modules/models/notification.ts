import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Notificacao } from "@prisma/client";

class NotificationModel extends BaseModel<Notificacao> {
    protected model = prisma.notificacao;
    protected include = {};
}

export const notificationModel = new NotificationModel();