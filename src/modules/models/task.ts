import { Prisma, Tarefa } from "@prisma/client";
import { BaseModel, TBaseGetAllParams } from "./base";
import prisma from "../lib/prisma";

const taskIncludes = {
  tarefas_documentos: {
    include: {
      documento: true,
      revisores: {
        include: {
          comentarios: {
            include: {
              revisor: {
                include: {
                  usuario: true,
                }
              }
            }
          },
          usuario: true,
        }
      },
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
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getTasksByUserAndId(id: string, id_usuario: string) {
    return this.model.findUnique({
      where: {
        id,
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
            revisores: {
              some: {
                id_usuario,
              },
            },
          },
        },
      },
      include: this.include,
      orderBy: {
        created_at: "desc",
      },
    });
  }
}

export const taskModel = new TaskModel();
