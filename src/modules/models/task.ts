import { Prisma, Tarefa } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const taskIncludes = {
  tarefas_documentos: {
    include: {
      documento: true,
    },
  },

} as Prisma.TarefaInclude;

class TaskModel extends BaseModel<Tarefa> {
  model = prisma.tarefa;
  include = taskIncludes;

  async getTasksByUser(id_usuario: string) {
    return this.model.findMany({
      where: {
        id_usuario,
      },
      include: this.include,
    });
  }

  async getTasksToReview(id_usuario: string) {
    return this.model.findMany({
      where: {
        tarefas_documentos: {
          some: {
            pedidos_revisao: {
              some: {
                revisores: {
                  some: {
                    id_usuario,
                  },
                },
              },
            },
          },
        },
      },
      include: this.include,
    });
  }
}

export const taskModel = new TaskModel();
