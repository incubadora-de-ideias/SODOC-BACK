import { FastifyReply, FastifyRequest } from "fastify";
import { userModel } from "../models/user";
import { userValidations } from "../validations/user";
import { BaseService } from "./base";
import { ErrorsHandler } from "../errors/handler";
import { hashService } from "./hash";

class UserService extends BaseService {
    protected model = userModel;
    protected createValidationSchema = userValidations.getData;
    protected updateValidationSchema = userValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = this.createValidationSchema.parse(req.body);
            const password = await hashService.hashPassword(data.password);

            const user = await this.model.create({
                ...data,
                password
            });
            
            res.send(user);
        } catch (error) {
            ErrorsHandler.handle(error, res);
        }
    }

}

export const userService = new UserService();