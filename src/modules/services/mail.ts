import nodemailer from "nodemailer";
import { renderTemplate } from "../lib/utils";
import { emailOptions } from "../templates/email";
import { IMailService, TemplateVariables } from "../types/mail";

export class MailService implements IMailService {
  async send<T extends keyof typeof emailOptions>(
    type: T,
    to: string,
    variables: Record<TemplateVariables[T], string>
  ) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isEmail.test(to)) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },

      });

      const html = renderTemplate(type, variables);

      const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Equipa SODOC",
        html,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
      }
    } else {
      throw new Error("Forneça um email válido");
    }
  }
}

export const mailService = new MailService();