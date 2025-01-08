import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Tarefa } from "@prisma/client";

class WorksModel extends BaseModel<Tarefa> {
    protected model = prisma.tarefa;
    protected include = {};
}

export const worksModel = new WorksModel();