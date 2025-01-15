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
import { userModel } from "../models/user";
import { validateUserEmailUseCase } from "../lib/mail";
import { notificationModel } from "../models/notification";
import { Documento, PedidoRevisao, Tarefa } from "@prisma/client";
import { askRevisionModel } from "../models/ask_revision";
import { reviewerModel } from "../models/reviewer";
import { paths } from "../lib/definitions/paths";

class TaskService extends BaseService {
  model = taskModel;
  createValidationSchema = taskValidations.getData;
  updateValidationSchema = taskValidations.getDataToUpdate;

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = req.body as { [key: string]: MultipartFile };
      const { fields, files } = await getFieldsAndFiles(data);

      console.log(fields);

      const { descricao, id_usuario, nome, usuarios } =
        taskValidations.getData.parse(fields);

      console.log("Usuários", usuarios);

      const task = (await this.model.create({
        descricao,
        id_usuario,
        nome,
      })) as Tarefa;

      for (const [key, file] of Object.entries(files)) {
        console.log(file.filename);
        const fileExtension = path.extname(file.filename).slice(1);
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
            const fileCategory =
              fileDirectories[fileExtension as keyof typeof fileDirectories];
            const filePath = `${fileCategory}/${file.filename}`;

            const uploadDir = path.join(paths.upload, fileCategory);
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
            const finalFilePath = path.join(uploadDir, file.filename);
            const fileStream = fs.createWriteStream(finalFilePath);
            const fileBuffer = await file.toBuffer();
            fileStream.write(fileBuffer);
            fileStream.end();
            const documentsFormate = {
              nome: file.filename,
              descricao: JSON.stringify(fields), // Converte o objeto em string JSON
              caminho: filePath,
            };
            const saveFile = (await documentModel.create(
              documentsFormate
            )) as Documento;

            const taskDocument = await taskDocumentModel.create({
              id_tarefa: task.id,
              id_documento: saveFile.id,
              id_usuario,
            });

            const askReview = (await askRevisionModel.create({
              id_tarefa_documentos: taskDocument.id,
              id_usuario_solicitante: id_usuario,
              criado_em: new Date(),
            })) as PedidoRevisao;

            usuarios?.map(async (userId: { id: string }) => {
              const user = await userModel.getById(userId.id);
              if (!user) {
                throw new Error("Usuário não encontrado");
              }

              const reviewer = await reviewerModel.create({
                id_usuario: userId.id,
                id_pedido_revisao: askReview.id,
                data_aprovacao: null,
                aprovado: false,
                estado: "PENDENTE",
              });
            });
          } else {
            console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
          }
        } else {
          console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
        }
      }
      usuarios?.map(async (userId: { id: string }) => {
        const user = await userModel.getById(userId.id);
        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        await validateUserEmailUseCase.run("REVISAO", user.email, {
          userName: user.nome,
          taskName: task.nome,
          link: `${process.env.CROSS_ORIGIN}/tasks/${task.id}`,
        });
      });
      res.send(task);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async getTasksByUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id_usuario } = taskValidations.getUserId.parse(req.params);
      const data = await this.model.getTasksByUser(id_usuario);
      res.send(data);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async getTasksToReview(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id_usuario } = taskValidations.getUserId.parse(req.params);
      const data = await this.model.getTasksToReview(id_usuario);
      res.send(data);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }
}
export const taskService = new TaskService();
