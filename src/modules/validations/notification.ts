import z from 'zod';

class NotificationValidations {
    public getData = z.object({
        id_usuario: z.string(),
        titulo: z.string(),
        descricao: z.string()
    })

    public getDataToUpdate = this.getData.partial()
}

export const notificationValidations = new NotificationValidations();