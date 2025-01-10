import { ZodType, ZodTypeDef } from "zod";
import { taskModel } from "../models/task";
import { taskValidations } from "../validations/task";
import { BaseService } from "./base";
import { FastifyReply, FastifyRequest } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { getFieldsAndFiles } from "../helpers/multipart/get_fields_and_files";
import { ErrorsHandler } from "../errors/handler";
import { fileDirectories } from "../helpers/formate/file-model";
import path from "path";
import fs from "fs";
import { documentModel } from "../models/documents";
import { taskDocumentModel } from "../models/task_document";

class TaskService extends BaseService {
  model = taskModel;
  createValidationSchema = taskValidations.getData;
  updateValidationSchema = taskValidations.getDataToUpdate;

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = req.body as { [key: string]: MultipartFile };
      const { fields, files } = await getFieldsAndFiles(data);

      console.log(fields, files);

      const { descricao, id_usuario, nome } =
        taskValidations.getData.parse(fields);

      const task = await this.model.create({
        descricao,
        id_usuario,
        nome,
      });

      for (const [key, file] of Object.entries(files['files[]'])) {
        const fileExtension = file.filename.split(".").pop()?.toLowerCase();
        console.log(fileExtension);

        if (
          fileExtension &&
          fileDirectories[fileExtension as keyof typeof fileDirectories]
        ) {
          if (fileExtension in fileDirectories) {
            console.log(
              `O arquivo ${file.filename} é do tipo: ${
                fileDirectories[fileExtension as keyof typeof fileDirectories]
              }`
            );
            const uploadDir = path.join(
              __dirname,
              `..`,
              `uploads/${
                fileDirectories[fileExtension as keyof typeof fileDirectories]
              }`
            );
            console.log(uploadDir);
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, file.filename);
            const fileStream = fs.createWriteStream(filePath);
            const fileBuffer = await file.toBuffer();
            fileStream.write(fileBuffer);
            fileStream.end();
            const documentsFormate = {
              nome: file.filename,
              descricao: null, // Converte o objeto em string JSON
              caminho: filePath,
            };
            const saveFile = await documentModel.create(documentsFormate);
            const taskDocument = await taskDocumentModel.create({
              id_tarefa: (task as { id: string }).id,
              id_documento: (saveFile as {id: string}).id,
            });
            console.log(saveFile);
          } else {
            console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
          }
        } else {
          console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
        }
      }
      res.send(task);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
}
export const taskService = new TaskService();
