import z from "zod";
import { nonEmptyString } from "../lib/utils";

class UsersGroupsValidatoins {
  getData = z.object({
    usuarios: z.array(z.string()).optional(),
    id_grupo: nonEmptyString(),
  });

  getDataToUpdate = this.getData.partial();

  getGroupsByUser = z.object({
    id_usuario: nonEmptyString(),
  });

  getByGroup = z.object({
    id_grupo: nonEmptyString(),
  });
}

export const usersGroupsValidations = new UsersGroupsValidatoins();
