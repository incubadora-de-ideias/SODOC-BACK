import { BaseService } from './base';
import { notificationValidations } from '../validations/notification';
import { notificationModel } from '../models/notification';

class NotificationService extends BaseService {
    model = notificationModel;
    createValidationSchema = notificationValidations.getData;
    updateValidationSchema = notificationValidations.getDataToUpdate;
}

export const notificationService = new NotificationService();