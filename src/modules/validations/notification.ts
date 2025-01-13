import z from "zod";
import { nonEmptyString } from "../lib/utils";

class NotificationValidations {
  public getData = z.object({
    id_usuario: nonEmptyString(),
    titulo: nonEmptyString(),
    descricao: nonEmptyString(),
  });

  public getDataToUpdate = this.getData.partial();
  getUserId = z.object({
    userId: nonEmptyString(),
  });
}

export const notificationValidations = new NotificationValidations();
