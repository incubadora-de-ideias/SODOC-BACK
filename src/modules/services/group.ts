import { BaseService } from './base';
import { groupModel } from '../models/group';
import { groupValidations } from '../validations/group';

class GroupService extends BaseService {
    model = groupModel;
    createValidationSchema = groupValidations.getData;
    updateValidationSchema = groupValidations.getDataToUpdate;
}

export const groupService = new GroupService();