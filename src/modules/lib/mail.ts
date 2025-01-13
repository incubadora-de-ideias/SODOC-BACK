import { DestinoNotificacao } from "@prisma/client";
import { notificationModel } from "../models/notification";
import { userModel } from "../models/user";
import { mailService } from "../services/mail";
import { emailOptions } from "../templates/email";
import { IMailService, TemplateVariables } from "../types/mail";
import prisma from "./prisma";

class ValidateUserEmailUseCase {
  constructor(private mailService: IMailService) {}

  async run<T extends keyof typeof emailOptions>(
    type: T,
    email: string,
    variables: Record<TemplateVariables[T], string>
  ) {
    await this.mailService.send(type, email, variables);

    const usuario = await userModel.getIdByEmial(email);

    if (!usuario) {
      throw new Error(`User with email ${email} not found`);
    }

    const notificacao = {
        id_usuario: usuario.id,
        titulo: `Notificação de ${type}`,
        descricao: JSON.stringify(variables), 
        tipo: type,
        destino: 'EXTERNO' as DestinoNotificacao, 
    };
    const sendNotification = await notificationModel.create(notificacao);
  
    return notificacao;
  }
}

export const validateUserEmailUseCase = new ValidateUserEmailUseCase(
  mailService
);
