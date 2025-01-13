import { Revisor } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class ReviewerModel extends BaseModel<Revisor> {
    model = prisma.revisor;
    include = {};
}

export const reviewerModel = new ReviewerModel();