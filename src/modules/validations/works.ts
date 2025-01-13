import z from 'zod';
import { nonEmptyString } from '../lib/utils';

class WorkValidations {
    public getData = z.object({
        nome: nonEmptyString(),
        descricao: nonEmptyString(),
        id_usuario: nonEmptyString()
    })

    public getDataToUpdate = this.getData.partial()
}

export const workValidations = new WorkValidations();