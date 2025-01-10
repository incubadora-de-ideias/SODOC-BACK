import { Prisma, UsuariosGrupo } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const usersGroupsIncludes = {
    usuario: true
} as Prisma.UsuariosGrupoInclude;

class UsersGroupsModel extends BaseModel<UsuariosGrupo> {
    model = prisma.usuariosGrupo;
    include = usersGroupsIncludes;

    async create(data: Omit<UsuariosGrupo, "id" | "confirmado">) {
        return this.model.create({
            data
        })
    }
    
    async getGroupsByUser(id_usuario: string) {
        return this.model.findMany({
            where: {
                id_usuario
            },
            include: this.include
        })
    }

    async getByGroup(id_grupo: string) {
        return this.model.findMany({
            where: {
                id_grupo
            },
            include: this.include
        })
    }

}

export const usersGroupsModel = new UsersGroupsModel();