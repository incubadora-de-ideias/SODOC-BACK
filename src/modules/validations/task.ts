import z from "zod";
import { nonEmptyString } from "../lib/utils";

class TaskValidation {
  getData = z.object({
    nome: nonEmptyString(),
    descricao: nonEmptyString(),
    id_usuario: nonEmptyString(),
  });

  getDataToUpdate = this.getData.partial();
}

export const taskValidations = new TaskValidation();
