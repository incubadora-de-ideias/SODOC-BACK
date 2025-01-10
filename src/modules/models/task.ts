import { Prisma, Tarefa } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";


const taskIncludes = {
  tarefas_documentos: true
} as Prisma.TarefaInclude;

class TaskModel extends BaseModel<Tarefa> {
  model = prisma.tarefa;
  include = taskIncludes;
}


export const taskModel = new TaskModel();
