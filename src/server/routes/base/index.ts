import { FastifyInstance } from "fastify";
import { IService } from "../../../modules/types/service";


export class BaseRoute {
  static async handle(
    app: FastifyInstance,
    service: IService,
    routeBaseName: string
  ) {
    app.get(`/${routeBaseName}`, service.getAll.bind(service));
    app.get(`/${routeBaseName}/:id`, service.getById.bind(service));
    app.post(`/${routeBaseName}`, service.create.bind(service));
    app.put(`/${routeBaseName}/:id`, service.update.bind(service));
    app.delete(`/${routeBaseName}/:id`, service.delete.bind(service));
  }
}

