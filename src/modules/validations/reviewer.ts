import z from "zod";
import { nonEmptyString } from "../lib/utils";

class ReviewerValidation {
  getData = z.object({
    id_usuario: nonEmptyString(),
    id_pedido_revisao: nonEmptyString(),
    data_aprovacao: z.coerce.string(),
  });

  getDataToUpdate = this.getData.partial().extend({
    estado: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"]),
    aprovado: z.boolean(),
  });

  getDataToUpdateAllStates = z.object({
    id_usuario: nonEmptyString(),
    id_tarefa: nonEmptyString(),
  });
}

export const reviewerValidation = new ReviewerValidation();
