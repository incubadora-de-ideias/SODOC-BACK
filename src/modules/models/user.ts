import { Usuario } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class UserModel extends BaseModel<Usuario> {
    model = prisma.usuario;
    include = {};

    async getData(identification: string){
        return this.model.findFirst({
            where: {
                OR: [
                    {
                        email: identification
                    },
                    {
                        telefone: identification
                    },
                    {
                        n_bi: identification    
                    }
                ]
            }
        })
    }

}

export const userModel = new UserModel();