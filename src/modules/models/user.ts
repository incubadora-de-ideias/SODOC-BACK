import { Usuario } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class UserModel extends BaseModel<Usuario> {
  model = prisma.usuario;
  include = {};

  async getData(identification: string) {
    return this.model.findFirst({
      where: {
        OR: [
          {
            email: identification,
          },
          {
            telefone: identification,
          },
          {
            n_bi: identification,
          },
        ],
      },
    });
  }

  async getByGroup(id_grupo: string) {
    return this.model.findMany({
      where: {
        OR: [
          {
            usuario_grupos: {
              some: {
                id_grupo,
              },
            },
          },
          {
            grupos: {
              some: {
                id: id_grupo,
              },
            },
          },
        ],
      },
      include: this.include,
    });
  }

  async getFilteredUsersToAdd(id_grupo: string, id_usuario: string) {
    return this.model.findMany({
      where: {
        NOT: {
          OR: [
            {
              usuario_grupos: {
                some: {
                  id_grupo,
                },
              },
            },
            {
              id: id_usuario,
            },
          ],
        },
      },
      include: this.include,
    });
  }
}

export const userModel = new UserModel();
