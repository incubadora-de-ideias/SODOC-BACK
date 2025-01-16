import { Prisma, TarefasDocumentos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const taskDocumentIncludes = {
    documento: true,
} as Prisma.TarefasDocumentosInclude

class TaskDocumentModel extends BaseModel<TarefasDocumentos> {
  model = prisma.tarefasDocumentos;
  include = taskDocumentIncludes;

/**
 * Creates a new task document record in the database.
 * @param id_documento The identifier of the document associated with the task.
 * @param id_tarefa The identifier of the task associated with the document.
 * @returns The created task document record.
 */

}

export const taskDocumentModel = new TaskDocumentModel();
