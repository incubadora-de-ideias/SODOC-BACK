import z from "zod";
import { nonEmptyString } from "../lib/utils";

class ReviewerValidation {
  getData = z.object({
    id_usuario: nonEmptyString(),
    id_pedido_revisao: nonEmptyString(),
    data_aprovacao: z.coerce.string(),
  });

  getDataToUpdate = this.getData.partial();
}

export const reviewerValidation = new ReviewerValidation();
