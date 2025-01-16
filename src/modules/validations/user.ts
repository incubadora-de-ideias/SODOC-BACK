import z from "zod";
import { nonEmptyString, validateBiFormat } from "../lib/utils";

class UserValidations {
  getData = z.object({
    nome: nonEmptyString(),
    telefone: nonEmptyString(),
    email: nonEmptyString(),
    n_bi: z.string().refine((value) => validateBiFormat(value)),
    password: nonEmptyString(),
  });

  getDataToUpdate = this.getData.partial();

  getLoginData = z.object({
    identification: nonEmptyString(),
    password: nonEmptyString(),
  });

  getFilteredUsersToAdd = z.object({
    id_grupo: nonEmptyString(),
  });
}

export const userValidations = new UserValidations();
