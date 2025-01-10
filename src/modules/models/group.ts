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
}

export const groupModel = new GroupModel();