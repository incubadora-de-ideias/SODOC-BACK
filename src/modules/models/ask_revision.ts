import { PedidoRevisao } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";



class AskRevisionModel extends BaseModel<PedidoRevisao> {
    model = prisma.pedidoRevisao;
    include = {};


}

export const askRevisionModel = new AskRevisionModel();