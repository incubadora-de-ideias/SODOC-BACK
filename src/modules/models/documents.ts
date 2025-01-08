import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Documento } from "@prisma/client";

class DocumentModel extends BaseModel<Documento> {
    protected model = prisma.documento;
    protected include = {};
}

export const documentModel = new DocumentModel();