import { Comentario, Prisma } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const commentIncludes = {
    revisor: {
        include: {
            usuario: true
        }
    }
} as Prisma.ComentarioInclude;

class CommentModel extends BaseModel<Comentario> {
    model = prisma.comentario;
    include = commentIncludes;
}

export const commentModel = new CommentModel();