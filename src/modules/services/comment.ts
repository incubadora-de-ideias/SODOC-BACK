import { commentModel } from "../models/comment";
import { commentValidation } from "../validations/comment";
import { BaseService } from "./base";

class CommentService extends BaseService{
    model = commentModel;
    createValidationSchema = commentValidation.getData;
    updateValidationSchema = commentValidation.getDataToUpdate;
}

export const commentService = new CommentService();