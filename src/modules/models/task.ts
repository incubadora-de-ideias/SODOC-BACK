import { Tarefa } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class TaskModel extends BaseModel<Tarefa> {
  model = prisma.tarefa;
}


export const taskModel = new TaskModel();
