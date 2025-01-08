import { BaseService } from './base';
import { workValidations } from '../validations/works';
import { worksModel } from '../models/works';

class WorkService extends BaseService {
    model = worksModel;
    createValidationSchema = workValidations.getData;
    updateValidationSchema = workValidations.getDataToUpdate;
}

export const workService = new WorkService();