import z from "zod";
import { nonEmptyString } from "../lib/utils";

class ReviewerValidation {
  getData = z.object({
    id_usuario: nonEmptyString(),
    id_pedido_revisao: nonEmptyString(),
    data_aprovacao: z.coerce.string(),
  });

  getDataToUpdate = this.getData.extend({
    estado: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"]),
    aprovado: z.boolean(),
  }).partial();

  getDataToUpdateAllStates = z.object({
    id_usuario: nonEmptyString(),
    id_tarefa: nonEmptyString(),
  });
}

export const reviewerValidation = new ReviewerValidation();
