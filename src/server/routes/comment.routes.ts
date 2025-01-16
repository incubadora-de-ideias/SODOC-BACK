import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { commentService } from "@/modules/services/comment";

export async function comments(app: FastifyInstance) {
  await BaseRoute.handle(app, commentService, "comments");
}
