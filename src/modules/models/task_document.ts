import { TarefasDocumentos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class TaskDocumentModel extends BaseModel<TarefasDocumentos> {
    model = prisma.tarefasDocumentos;
    include = {};
}

export const taskDocumentModel = new TaskDocumentModel();