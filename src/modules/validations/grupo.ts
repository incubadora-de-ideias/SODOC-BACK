import z from 'zod';

class GroupValidations {
    public getData = z.object({
        nome: z.string()
    })

    public getDataToUpdate = this.getData.partial()
}

export const groupValidations = new GroupValidations();