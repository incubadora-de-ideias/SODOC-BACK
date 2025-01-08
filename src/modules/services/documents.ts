import { BaseService } from './base';
import { documentModel } from '../models/documents';
import { documentValidations } from '../validations/documents';

class DocumentService extends BaseService {
    model = documentModel;
    createValidationSchema = documentValidations.getData;
    updateValidationSchema = documentValidations.getDataToUpdate;
}

export const documentService = new DocumentService();