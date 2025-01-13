import z from 'zod';
import { nonEmptyString } from '../lib/utils';

class NotificationValidations {
    public getData = z.object({
        id_usuario: nonEmptyString(),
        titulo: nonEmptyString(),
        descricao: nonEmptyString()
    })

    public getDataToUpdate = this.getData.partial()

    public markAsread = z.object({
        id: z.string()
    })
}

export const notificationValidations = new NotificationValidations();