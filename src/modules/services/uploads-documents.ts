import { FastifyReply, FastifyRequest } from "fastify";
import { getFieldsAndFiles } from "../helpers/multipart/get_fields_and_files";
import { MultipartFile } from "@fastify/multipart";
import { fileDirectories } from "../helpers/formate/file-model";
import path from "path";
import fs from "fs";
import { documentModel } from "../models/documents";

class UploadsDocumentsService {
    async upload(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = req.body as { [key: string]: MultipartFile };
            const { fields, files } = await getFieldsAndFiles(data);

            console.log({ fields, files });

            // Verificar os arquivos
            for (const [key, file] of Object.entries(files)) {
                const fileExtension = file.filename.split('.').pop()?.toLowerCase();
                console.log(fileExtension);

                if (fileExtension && fileDirectories[fileExtension as keyof typeof fileDirectories]) {
                    if (fileExtension in fileDirectories) {
                        console.log(`O arquivo ${file.filename} é do tipo: ${fileDirectories[fileExtension as keyof typeof fileDirectories]}`);
                        const uploadDir = path.join(__dirname, `..`, `uploads/${fileDirectories[fileExtension as keyof typeof fileDirectories]}`);
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
                            descricao: JSON.stringify(fields), // Converte o objeto em string JSON
                            caminho: filePath
                        };
                        const saveFile = await documentModel.create(documentsFormate);
                        res.send(saveFile);
                    } else {
                        console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
                    }
                } else {
                    console.log(`O arquivo ${file.filename} tem um tipo desconhecido.`);
                }
            }

            // Retornar os arquivos ou outro processamento
            res.send({ fields, files });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Erro ao processar o upload" });
        }
    }
}

export const uploadsDocumentsService = new UploadsDocumentsService();
