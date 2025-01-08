import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
  } from "@prisma/client/runtime/library";
  import { FastifyReply } from "fastify";
  import { AppError } from "./app";
  import { PrismaErrorHandler } from "./prisma";
  import { ZodError } from "zod";
  import { ZodErrorHandler } from "./zod";
  
  export class ErrorsHandler {
    static handle(error: any, res: FastifyReply): void {
      let appError: AppError;
      console.log("Erro:", error);
  
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientUnknownRequestError
      ) {
        appError = PrismaErrorHandler.handle(error);
      } else if (error instanceof ZodError) {
        appError = ZodErrorHandler.handle(error);
      } else if (error instanceof AppError) {
        appError = error;
      } else {
        console.error("Erro não operacional:", error);
        appError = new AppError("Erro interno do servidor", 500, false);
      }
  
      if (!appError.isOperational) {
        console.error("Erro não operacional:", error);
      }
      res.status(appError.statusCode).send({
        status: "error",
        message: appError.message,
      });
    }
  }
  