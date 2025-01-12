import { FastifyReply, FastifyRequest } from "fastify";
import { usersGroupsModel } from "../models/users_groups";
import { usersGroupsValidations } from "../validations/users_groups";
import { BaseService } from "./base";
import { ErrorsHandler } from "../errors/handler";
import { mailService } from "./mail";
import prisma from "../lib/prisma";
import { userModel } from "../models/user";
import { groupModel } from "../models/group";
import { notificationModel } from "../models/notification";
import { validateUserEmailUseCase } from "../lib/mail";

class UsersGroupsService extends BaseService {
  model = usersGroupsModel;
  createValidationSchema = usersGroupsValidations.getData;
  updateValidationSchema = usersGroupsValidations.getDataToUpdate;

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = this.createValidationSchema.parse(req.body);
      const group = await groupModel.getById(data.id_grupo);

      if (!group) {
        throw new Error("Grupo não encontrado");
      }

      const usersGroups = data.usuarios?.map(async (id_usuario) => {
        const user = await userModel.getById(id_usuario);

        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        const userGroup = await this.model.create({
          id_usuario,
          id_grupo: data.id_grupo,
        });

        const payload = { idUserGroup: userGroup.id };

        const token = req.jwt.sign(payload);

        const url = `${req.protocol}://${req.hostname}`;

        await validateUserEmailUseCase.run("CONFIRMACAO", user?.email, {
          groupName: group.nome,
          confirmationLink: `${url}/users_groups/confirmation?token=${token}`,
          link: url,
        });

        await notificationModel.create({
          id_usuario,
          titulo: "Convite para grupo",
          descricao: `Você foi convidado para o grupo ${group.nome}`,
          tipo: "CONFIRMACAO",
          destino: "EXTERNO",
        });
        return userGroup;
      });

      res.send(usersGroups);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async getGroupsByUser(req: FastifyRequest, res: FastifyReply) {
    console.log(req.params);
    try {
      const { id_usuario } = usersGroupsValidations.getGroupsByUser.parse(
        req.params
      );
      const data = await this.model.getGroupsByUser(id_usuario);
      res.send(data);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
  async getByGroup(req: FastifyRequest, res: FastifyReply) {
    try {
      console.log(req.params);
      const { id_grupo } = usersGroupsValidations.getByGroup.parse(req.params);
      const data = await this.model.getByGroup(id_grupo);
      res.send(data);
    } catch (error) {
      console.log(error);
      ErrorsHandler.handle(error, res);
    }
  }

  async groupConfirmation(req: FastifyRequest, res: FastifyReply) {
    const { token } = req.query as { token: string };
    const { idUserGroup } = req.jwt.verify(token) as {
      idUserGroup: string;
    };

    if (!idUserGroup) {
      return res.status(400).send({
        message: "Token de autenticação inválido ou expirado",
        sucess: false,
      });
    }

    const userGroup = await this.model.update(idUserGroup, {
      confirmado: true,
    });

    res.send(userGroup);
  }
}

export const usersGroupsService = new UsersGroupsService();
