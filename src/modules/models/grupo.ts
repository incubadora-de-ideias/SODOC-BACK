import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Grupo } from "@prisma/client";

class GrupoModel extends BaseModel<Grupo> {
    protected model = prisma.grupo;
    protected include = {};
}

export const grupoModel = new GrupoModel();