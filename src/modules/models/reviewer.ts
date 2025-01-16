import { Prisma, Revisor } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const reviewerIncludes = {
    usuario: true,
} as Prisma.RevisorInclude;

class ReviewerModel extends BaseModel<Revisor> {
    model = prisma.revisor;
    include = reviewerIncludes;

    async updateAllStates(id_usuario: string, id_tarefa: string) {
        return this.model.updateMany({
            where: {
                id_usuario,
                tarefa_documento: {
                    id_tarefa
                }
            },
            data: {
                estado: "EM_ANDAMENTO"
            }
        });
    }
}

export const reviewerModel = new ReviewerModel();