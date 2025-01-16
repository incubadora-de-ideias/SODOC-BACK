import { FastifyReply, FastifyRequest } from "fastify";
import { reviewerModel } from "../models/reviewer";
import { reviewerValidation } from "../validations/reviewer";
import { BaseService } from "./base";
import { ErrorsHandler } from "../errors/handler";

class ReviewerService extends BaseService{
    model = reviewerModel;
    createValidationSchema = reviewerValidation.getData;
    updateValidationSchema = reviewerValidation.getDataToUpdate;

    async updateAllStates(req: FastifyRequest, res: FastifyReply){
        try {
            const { id_usuario, id_tarefa } = reviewerValidation.getDataToUpdateAllStates.parse(req.params);
            const updatedData = await this.model.updateAllStates(id_usuario, id_tarefa);
            res.send(updatedData);
        } catch (error) {
            console.log(error);
            ErrorsHandler.handle(error, res);
        }
    }  
}

export const reviewerService = new ReviewerService();