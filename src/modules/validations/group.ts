import z from 'zod';

class GroupValidations {
    public getData = z.object({
        nome: z.string(),
        id_usuario: z.string()
    })

    public getDataToUpdate = this.getData.partial()
}

export const groupValidations = new GroupValidations();