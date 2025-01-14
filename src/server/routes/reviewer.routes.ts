import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { reviewerService } from "@/modules/services/reviewer";

export async function reviewers(app: FastifyInstance) {
  await BaseRoute.handle(app, reviewerService, "reviewers");
}