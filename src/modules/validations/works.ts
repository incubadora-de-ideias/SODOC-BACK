import z from 'zod';

class WorkValidations {
    public getData = z.object({
        nome: z.string(),
        descricao: z.string(),
        id_usuario: z.string()
    })

    public getDataToUpdate = this.getData.partial()
}

export const workValidations = new WorkValidations();