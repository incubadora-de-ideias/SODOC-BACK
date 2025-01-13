import z from "zod";
import { nonEmptyString } from "../lib/utils";

class TaskValidation {
  getData = z.object({
    nome: nonEmptyString(),
    descricao: nonEmptyString(),
    id_usuario: nonEmptyString(),
    usuarios: z
        .union([
          z.array(nonEmptyString()),  
          z.string().refine(
            (val) => {
              try {
                JSON.parse(val);
                return true;
              } catch (e) {
                return false;
              }
            },
            {
              message: "A string não é um JSON válido.",
            }
          ),
        ])
        .transform((val) => {
          if (typeof val === "string") {
            return JSON.parse(val) as Array<string>;
          }
          return val;
        }),

  });

  getDataToUpdate = this.getData.partial();

  getUserId = z.object({
    id_usuario: nonEmptyString(),
  });
}

export const taskValidations = new TaskValidation();
