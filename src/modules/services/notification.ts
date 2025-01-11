import { BaseService } from './base';
import { notificationValidations } from '../validations/notification';
import { notificationModel } from '../models/notification';
import { FastifyReply, FastifyRequest } from 'fastify';

class NotificationService extends BaseService {
    model = notificationModel;
    createValidationSchema = notificationValidations.getData;
    updateValidationSchema = notificationValidations.getDataToUpdate;

    async markAsRead(req: FastifyRequest, res: FastifyReply){
        try {
            const { id } = notificationValidations.markAsread.parse(req.params);
            const mark = await this.model.markAsread(id);
            return mark;
        } catch (error) {
            console.log("Erro ao marcar como lido!")
        }
    }
}

export const notificationService = new NotificationService();