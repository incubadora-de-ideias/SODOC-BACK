import { ZodError } from "zod";
import { AppError } from "./app";

export class ZodErrorHandler {
  static handle(error: ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return new AppError("Erro de validação", 400, true, formattedErrors);
  }
}
