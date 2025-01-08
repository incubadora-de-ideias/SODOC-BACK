import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { workService } from "@/modules/services/works";

export async function works(app: FastifyInstance) {
  await BaseRoute.handle(app, workService, "works");
}