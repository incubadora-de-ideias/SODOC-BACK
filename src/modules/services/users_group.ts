import { FastifyReply, FastifyRequest } from "fastify";
import { usersGroupsModel } from "../models/users_groups";
import { usersGroupsValidations } from "../validations/users_groups";
import { BaseService } from "./base";
import { ErrorsHandler } from "../errors/handler";

class UsersGroupsService extends BaseService {
    model = usersGroupsModel;
    createValidationSchema = usersGroupsValidations.getData;
    updateValidationSchema = usersGroupsValidations.getDataToUpdate;

    async getGroupsByUser(req: FastifyRequest, res: FastifyReply) {
        console.log(req.params);
        try {
            const { id_usuario } = usersGroupsValidations.getGroupsByUser.parse(req.params);
            const data = await this.model.getGroupsByUser(id_usuario);
            res.send(data);
        } catch (error) {
            ErrorsHandler.handle(error, res);
        }
    }
}

export const usersGroupsService = new UsersGroupsService();