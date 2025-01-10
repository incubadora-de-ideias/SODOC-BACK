import { emailOptions } from "../templates/email";

interface IMailService {
    send: <T extends keyof typeof emailOptions>(
        type: T, 
        to: string,
        variables: Record<TemplateVariables[T], string>  
      ) => Promise<void>;
}

type ExtractVariables<T extends string> =
  T extends `${string}{{${infer Var}}}${infer Rest}`
    ? Var | ExtractVariables<Rest>
    : never;

type TemplateVariables = {
  [K in keyof typeof emailOptions]: ExtractVariables<(typeof emailOptions)[K]>;
};
