import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { documentService } from "../../modules/services/documents";

export async function documents(app: FastifyInstance) {
  await BaseRoute.handle(app, documentService, "documents");
}
