import { Prisma, UsuariosGrupo } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const usersGroupsIncludes = {
    grupo: true
} as Prisma.UsuariosGrupoInclude;

class UsersGroupsModel extends BaseModel<UsuariosGrupo> {
    model = prisma.usuariosGrupo;
    include = usersGroupsIncludes;
    
    async getGroupsByUser(id_usuario: string) {
        return this.model.findMany({
            where: {
                id_usuario
            },
            include: this.include
        })
    }

}

export const usersGroupsModel = new UsersGroupsModel();