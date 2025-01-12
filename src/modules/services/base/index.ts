import { FastifyRequest, FastifyReply } from "fastify";
import { ZodSchema } from "zod";
import { ErrorsHandler } from "../../errors/handler";
import { BaseModel } from "../../models/base";
import { QueryValidations } from "../../validations/query";
import { ParamsValidations } from "../../validations/params";

export abstract class BaseService {
  protected abstract model: BaseModel<any>;

  protected abstract createValidationSchema: ZodSchema;
  protected abstract updateValidationSchema: ZodSchema;
  queryValidation: ZodSchema = QueryValidations.getData;

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = this.createValidationSchema.parse(req.body);

      const item = await this.model.create(data);
      res.send(item);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async getAll(req: FastifyRequest, res: FastifyReply) {  
    try {
      const { limit, page, filter, ...rest } = this.queryValidation.parse(
        req.query
      );
      console.log({ limit, page, filter, ...rest });
      let take = undefined;
      let skip = undefined;
      if (page && limit) {
        take = parseInt(limit);
        skip = take * (parseInt(page) - 1);
      }
      const items = await this.model.getAll({ take, skip, filter, ...rest });

      const totalItems = await this.model.count();
      const totalPages = take ? Math.ceil(totalItems / take) : 1;
      const currentPage = page ? parseInt(page) : 1;

      const data: DataPage<typeof items> = {
        data: items,
        info: {
          totalItems,
          totalPages,
          currentPage,
        },
      };
      console.log("usuarios",data)

      res.send(data);
    } catch (error) {
      console.log(error);
      ErrorsHandler.handle(error, res);
    }
  }

  async getById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = ParamsValidations.getId.parse(req.params);
      const item = await this.model.getById(id);
      res.send(item);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = ParamsValidations.getId.parse(req.params);

      const dataToUpdate = this.updateValidationSchema.parse(req.body);

      const updatedItem = await this.model.update(id, dataToUpdate);
      res.send(updatedItem);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = ParamsValidations.getId.parse(req.params);
      const deletedItem = await this.model.delete(id);
      res.send(deletedItem);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
}
