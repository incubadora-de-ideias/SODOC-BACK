import { Prisma } from "@prisma/client";
import { AppError } from "./app";
import { formatCamelCaseToTitle } from "../lib/utils";

export class PrismaErrorHandler {
  static handle(error: any): AppError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.modelName as string) || "";

        return new AppError(
          `Este(a) ${formatCamelCaseToTitle(field)} já existe.`,
          409
        );
      }

      if (error.code === "P2025") {
        return new AppError("Registro não encontrado.", 404);
      }
    }

    return new AppError("Erro de banco de dados.", 500);
  }
}
