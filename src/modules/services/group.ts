import { BaseService } from "./base";
import { groupModel } from "../models/group";
import { groupValidations } from "../validations/group";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorsHandler } from "../errors/handler";

class GroupService extends BaseService {
  model = groupModel;
  createValidationSchema = groupValidations.getData;
  updateValidationSchema = groupValidations.getDataToUpdate;

  async getUserGroups(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id_usuario } = groupValidations.getUserGroups.parse(req.params);
      const data = await this.model.getUserGroups(id_usuario);
      console.log(data)
      res.send(data);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
}

export const groupService = new GroupService();
