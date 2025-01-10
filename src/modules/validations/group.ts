import z from 'zod';

class GroupValidations {
    public getData = z.object({
        nome: z.string(),
        id_usuario: z.string()
    })

    public getDataToUpdate = this.getData.partial()

    public getUserGroups = z.object({
        id_usuario: z.string()
    })
}

export const groupValidations = new GroupValidations();