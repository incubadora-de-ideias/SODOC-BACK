import { MultipartFile } from "@fastify/multipart";

export interface IMultipartField extends MultipartFile {
  value: string;
}

export interface IMultipartBody {
  [key: string]: MultipartFile;
}
