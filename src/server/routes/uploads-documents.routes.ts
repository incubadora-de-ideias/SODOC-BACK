import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { uploadsDocumentsService } from "../../modules/services/uploads-documents";

export async function uploads(app: FastifyInstance) {
  app.post("/uploads", uploadsDocumentsService.upload.bind(uploadsDocumentsService));
}