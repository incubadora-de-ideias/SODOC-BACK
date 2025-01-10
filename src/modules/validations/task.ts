import z from "zod";

class TaskValidation {
  getData = z.object({
    nome: z.string(),
    descricao: z.string(),
    id_usuario: z.string(),
  });

  getDataToUpdate = this.getData.partial();
}

export const taskValidations = new TaskValidation();
