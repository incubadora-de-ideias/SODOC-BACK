import z from "zod";

class UserValidations {
    getData = z.object({
        nome: z.string(),
        telefone: z.string(),
        email: z.string().email(),
        n_bi: z.string(),
        password: z.string()
    });

    getDataToUpdate = this.getData.partial();

    getLoginData = z.object({
        identification: z.string(),
        password: z.string()
    });

    getByGroup = z.object({
        id_grupo: z.string()
    })

}

export const userValidations = new UserValidations();