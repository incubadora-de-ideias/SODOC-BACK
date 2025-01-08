import { IMultipartBody, IMultipartField } from "@/modules/types/multipart";
import { MultipartFile } from "@fastify/multipart";
import { removeCircularReferences } from "../objects/remove_circular_references";

export async function getFieldsAndFiles(data: IMultipartBody) {
  const fields: Record<string, string> = {};
  const files: Record<string, MultipartFile> = {};

  for (const [key, obj] of Object.entries(data)) {
    if ((obj.type as "field" | "file") === "field") {
      fields[key] = (obj as IMultipartField).value;
    } else {
      // Remover referências circulares dos objetos de arquivos
      files[key] = removeCircularReferences(obj);
    }
  }

  // Garantir que os campos também não tenham referências circulares
  const cleanedFields = removeCircularReferences(fields);

  return { fields: cleanedFields, files };
}
