import z from 'zod';

class DocumentValidations {
    public getData = z.object({
        nome: z.string(),
        descricao: z.string(),
        caminho: z.string()
    })

    public getDataToUpdate = this.getData.partial()
}

export const documentValidations = new DocumentValidations();