import { FastifyInstance } from "fastify";
import { documents } from "./documents.routes";
import { groups } from "./grupo.routes";
import { notifications } from "./notification.routes";
import { uploads } from "./uploads-documents.routes";
import { works } from "./work.routes";

export default async function routes(app: FastifyInstance){
    await documents(app);
    await groups(app);
    await notifications(app);
    await uploads(app);
    await works(app);
}