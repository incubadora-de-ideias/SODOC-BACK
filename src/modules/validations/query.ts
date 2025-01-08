import { z } from "zod";

export class QueryValidations {
  static getData = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    filter: z.string().optional(),
  });
}
