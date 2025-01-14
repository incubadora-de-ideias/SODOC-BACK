import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Notificacao } from "@prisma/client";

class NotificationModel extends BaseModel<Notificacao> {
  protected model = prisma.notificacao;
  protected include = {};

  async create(data: Omit<Notificacao, "id" | "data" | "lida">) {
    return this.model.create({
      data,
    });
  }
  async getByUser(userId: string) {
    return this.model.findMany({
      where: {
        id_usuario: userId,
      },
      orderBy:{
        data: "desc"
      }
    });
  }
  async getUnreadCount(userId: string) {
    return this.model.count({
      where: {
        id_usuario: userId,
        lida: false,
      },
    });
  }
  async markAsread(id: string){
      const update =  await this.model.update({
          where: { id },
          data: { lida: true }
      });
      return update;
  }

  async getTitleAndDescrition(type: string){
    let descricao = "";
    let titulo = "";
    
    if(type == "ALERTA"){
      titulo = "⚠️ Alerta Importante"
      descricao = `Ocorreu uma situação que requer sua atenção imediata no sistema de controle de fluxos de trabalho.`
    }
    else if(type == "PENDENTE"){
      titulo = "🕒 Tarefa Pendente"
      descricao = `Você tem uma tarefa pendente no sistema que precisa ser concluída.`
    }
    else if(type == "SUCESSO"){
      titulo = "✅ Sucesso"
      descricao = `Parabéns! A ação solicitada foi concluída com sucesso no sistema.`
    }
    else if(type == "MENSAGEM"){
      titulo = "📩 Nova Mensagem"
      descricao = `Você recebeu uma nova mensagem no sistema de controle de fluxos de trabalho`
    }
    else if(type ==  "CONFIRMACAO"){
      titulo = "🔗 Confirmação de Adição ao Grupo"
      descricao = "Você foi convidado para fazer parte do grupo <strong>{{groupName}}</strong>"
    }
    return { descricao, titulo };   
  }
}

export const notificationModel = new NotificationModel();
