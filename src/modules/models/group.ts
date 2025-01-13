import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Grupo, Prisma } from "@prisma/client";


type TGroupDataToCreate = Omit<Grupo, "id"> & {
    usuarios?: string[]
}

const groupIncludes = {
    usuario: true,
    usuarios_grupo: true,
} as Prisma.GrupoInclude;

class GroupModel extends BaseModel<Grupo> {
    protected model = prisma.grupo;
    protected include = groupIncludes;

    async create({ usuarios, ...rest}: TGroupDataToCreate) {
        return this.model.create({
            data: {
                ...rest,
                usuarios_grupo: {
                    create: usuarios?.map(id_usuario => ({
                        id_usuario
                    }))
                }
            },
        })
    }

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