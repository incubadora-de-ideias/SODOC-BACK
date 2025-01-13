import { FastifyReply, FastifyRequest } from "fastify";
import { userModel } from "../models/user";
import { userValidations } from "../validations/user";
import { BaseService } from "./base";
import { ErrorsHandler } from "../errors/handler";
import { hashService } from "./hash";
import { validateBiFormat } from "../lib/utils";

class UserService extends BaseService {
    protected model = userModel;
    protected createValidationSchema = userValidations.getData;
    protected updateValidationSchema = userValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = this.createValidationSchema.parse(req.body);
            const password = await hashService.hashPassword(data.password);

            if(validateBiFormat(data.n_bi)) {
                return res.status(400).send({ message: "Número de BI inválido" });
            }

            const user = await this.model.create({
                ...data,
                password
            });
            
            res.send(user);
        } catch (error) {
            ErrorsHandler.handle(error, res);
        }
    }

    async getFilteredUsersToAdd(req: FastifyRequest, res: FastifyReply) {
        try {
            const userId = req.user.id;
            const { id_grupo } = userValidations.getFilteredUsersToAdd.parse(req.params);
            const users = await this.model.getFilteredUsersToAdd(id_grupo, userId);
            res.send(users);
        } catch (error) {
            ErrorsHandler.handle(error, res);
        }
    }
}   

export const userService = new UserService();