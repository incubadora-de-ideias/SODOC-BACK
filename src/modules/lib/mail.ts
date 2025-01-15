import { DestinoNotificacao } from "@prisma/client";
import { notificationModel } from "../models/notification";
import { userModel } from "../models/user";
import { mailService } from "../services/mail";
import { emailOptions } from "../templates/email";
import { IMailService, TemplateVariables } from "../types/mail";

class ValidateUserEmailUseCase {
  constructor(private mailService: IMailService) {}

  async run<T extends keyof typeof emailOptions>(
    type: T,
    email: string,
    variables: Record<TemplateVariables[T], string>
  ) {
    await this.mailService.send(type, email, variables);

    const emailContent = this.generateEmailContent(
      emailOptions[type],
      variables
    );

    const usuario = await userModel.getIdByEmial(email);

    if (!usuario) {
      throw new Error(`User with email ${email} not found`);
    }
    const plainTextDescription = this.extractTextFromHtml(emailContent);

    const notificacao = {
      id_usuario: usuario.id,
      titulo: `Notificação de ${type}`,
      descricao: plainTextDescription,
      tipo: type,
      destino: "EXTERNO" as DestinoNotificacao,
    };
    const sendNotification = await notificationModel.create(notificacao);

    return sendNotification;
  }
  private generateEmailContent(
    template: string,
    variables: Record<string, string>
  ): string {
    return template.replace(
      /{{(.*?)}}/g,
      (_, key) => variables[key.trim()] || ""
    );
  }
  private extractTextFromHtml(html: string): string {
    return html
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<\/p>|<\/div>|<br\s*\/?>/gi, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/[^\S\r\n]{2,}/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();
  }
}

export const validateUserEmailUseCase = new ValidateUserEmailUseCase(
  mailService
);
