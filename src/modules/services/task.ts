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
import {
  Documento,
  Tarefa,
  TarefasDocumentos,
} from "@prisma/client";
import { reviewerModel } from "../models/reviewer";
import { paths } from "../lib/definitions/paths";
import { ParamsValidations } from "../validations/params";

class TaskService extends BaseService {
  model = taskModel;
  createValidationSchema = taskValidations.getData;
  updateValidationSchema = taskValidations.getDataToUpdate;

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = req.body as { [key: string]: MultipartFile };
      const { fields, files } = await getFieldsAndFiles(data);

      const { descricao, id_usuario, nome, usuarios } =
        taskValidations.getData.parse(fields);

      const task = (await this.model.create({
        descricao,
        id_usuario,
        nome,
      })) as Tarefa;

      for (const [key, file] of Object.entries(files)) {
        const fileExtension = path.extname(file.filename).slice(1);

        if (
          fileExtension &&
          fileDirectories[fileExtension as keyof typeof fileDirectories]
        ) {
          const fileCategory =
            fileDirectories[fileExtension as keyof typeof fileDirectories];
          const filePath = `${fileCategory}/${file.filename}`;

          const uploadDir = path.join(paths.upload, fileCategory);
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const finalFilePath = path.join(uploadDir, file.filename);
          await fs.promises.writeFile(finalFilePath, await file.toBuffer());

          const document = (await documentModel.create({
            nome: file.filename,
            descricao: JSON.stringify(fields),
            caminho: filePath,
          })) as Documento;

          const taskDocument = (await taskDocumentModel.create({
            id_tarefa: task.id,
            id_documento: document.id,
          })) as TarefasDocumentos;

          if (usuarios.length > 0) {
            await Promise.all(
              usuarios.map(async (userId: { id: string }) => {
                await reviewerModel.create({
                  id_usuario: userId.id,
                  id_tarefa_documento: taskDocument.id,
                  data_aprovacao: null,
                  aprovado: false,
                  estado: "PENDENTE",
                });
              })
            );
          } else {
            console.warn(`Revisores não encontrados para ${file.filename}`);
          }
        }
      }

      // Enviar um único e-mail consolidado para cada revisor
      await Promise.all(
        usuarios.map(async (userId: { id: string }) => {
          const user = await userModel.getById(userId.id);
          if (user) {
            await validateUserEmailUseCase.run("REVISAO", user.email, {
              userName: user.nome,
              taskName: task.nome,
              link: `${process.env.CROSS_ORIGIN}/tarefas/${task.id}`,
            });
          } else {
            console.warn(`Usuário não encontrado: ${userId.id}`);
          }
        })
      );

      res.send(task);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  }

  async getTasksByUserAndId(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id_usuario } = taskValidations.getUserId.parse(req.params);
      const { id } = ParamsValidations.getId.parse(req.params);
      const data = await this.model.getTasksByUserAndId(id, id_usuario);
      res.send(data);
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
