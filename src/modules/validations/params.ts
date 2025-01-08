import { z } from "zod";
export class ParamsValidations {
  static getId = z.object({
    id: z.string().uuid(),
  });
}
