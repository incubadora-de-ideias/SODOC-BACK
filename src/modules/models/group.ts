import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Grupo, Prisma } from "@prisma/client";


const groupIncludes = {
    usuario: true,
    usuarios_grupo: true,
} as Prisma.GrupoInclude;

class GroupModel extends BaseModel<Grupo> {
    protected model = prisma.grupo;
    protected include = groupIncludes;

    async getUserGroups(id_usuario: string) {
        return this.model.findMany({
            where: {
                id_usuario
            },
            include: this.include
        })
    }
}

export const groupModel = new GroupModel();