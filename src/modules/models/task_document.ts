import { Prisma, TarefasDocumentos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const taskDocumentIncludes = {
  documento: true,
  revisores: true,
} as Prisma.TarefasDocumentosInclude;

class TaskDocumentModel extends BaseModel<TarefasDocumentos> {
  model = prisma.tarefasDocumentos;
  include = taskDocumentIncludes;
}

export const taskDocumentModel = new TaskDocumentModel();
