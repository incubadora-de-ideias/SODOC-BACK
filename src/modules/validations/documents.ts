import z from 'zod';
import { nonEmptyString } from '../lib/utils';

class DocumentValidations {
    public getData = z.object({
        nome: nonEmptyString(),
        descricao: nonEmptyString(),
        caminho: nonEmptyString()
    })

    public getDataToUpdate = this.getData.partial()
}

export const documentValidations = new DocumentValidations();