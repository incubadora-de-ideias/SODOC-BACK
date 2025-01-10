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
  }
}

export const validateUserEmailUseCase = new ValidateUserEmailUseCase(
  mailService
);
