import { BaseService } from './base';
import { grupoModel } from '../models/grupo';
import { groupValidations } from '../validations/grupo';

class GroupService extends BaseService {
    model = grupoModel;
    createValidationSchema = groupValidations.getData;
    updateValidationSchema = groupValidations.getDataToUpdate;
}

export const groupService = new GroupService();