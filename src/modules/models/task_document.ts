import { Prisma, TarefasDocumentos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

type TDocumentTypeToCreate = Omit<
  TarefasDocumentos,
  "id" | "id_pedido_revisao"
> & {
    id_usuario: string;
};

const taskDocumentIncludes = {
    documento: true,
} as Prisma.TarefasDocumentosInclude

class TaskDocumentModel extends BaseModel<TarefasDocumentos> {
  model = prisma.tarefasDocumentos;
  include = taskDocumentIncludes;

  async create({ id_documento, id_tarefa, id_usuario }: TDocumentTypeToCreate) {
    return this.model.create({
      data: {
        id_documento,
        id_tarefa,
        pedidos_revisao: {
            create: {
                id_usuario_solicitante: id_usuario
            }
        }
      },
    });
  }
}

export const taskDocumentModel = new TaskDocumentModel();
