import z from 'zod';
import { nonEmptyString } from '../lib/utils';

class GroupValidations {
    public getData = z.object({
        nome: nonEmptyString(),
        id_usuario: nonEmptyString(),
        usuarios:z.array(z.string()).optional()
    })

    public getDataToUpdate = this.getData.partial()

    public getUserGroups = z.object({
        id_usuario: nonEmptyString()
    })
}

export const groupValidations = new GroupValidations();