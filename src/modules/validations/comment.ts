import z from "zod";
import { nonEmptyString } from "../lib/utils";

class CommentValidation {
    getData = z.object({
        id_revisor: nonEmptyString(),
        texto: nonEmptyString(),
    })

    getDataToUpdate = this.getData.partial()
}

export const commentValidation = new CommentValidation();