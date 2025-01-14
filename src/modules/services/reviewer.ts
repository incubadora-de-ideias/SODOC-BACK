import { reviewerModel } from "../models/reviewer";
import { reviewerValidation } from "../validations/reviewer";
import { BaseService } from "./base";

class ReviewerService extends BaseService{
    model = reviewerModel;
    createValidationSchema = reviewerValidation.getData;
    updateValidationSchema = reviewerValidation.getDataToUpdate;
}

export const reviewerService = new ReviewerService();