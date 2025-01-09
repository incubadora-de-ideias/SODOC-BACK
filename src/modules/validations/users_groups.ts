import z from "zod";

class UsersGroupsValidatoins {
    getData = z.object({
        id_usuario: z.string(),
        id_grupo: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getGroupsByUser = z.object({
        id_usuario: z.string()
    })
    
}

export const usersGroupsValidations = new UsersGroupsValidatoins();