export const emailOptions = {
  ALERTA: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f8d7da;
              color: #721c24;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #f5c6cb;
              border-radius: 5px;
              background-color: #f8d7da;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">⚠️ Alerta Importante</div>
            <div class="content">
              <p>Olá {{userName}},</p>
              <p>Ocorreu uma situação que requer sua atenção imediata no sistema de controle de fluxos de trabalho.</p>
              <p><strong>Detalhes:</strong> {{details}}</p>
            </div>
            <div class="footer">
              <p>Acesse sua conta para mais informações: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,

  PENDENTE: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #fff3cd;
              color: #856404;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #ffeeba;
              border-radius: 5px;
              background-color: #fff3cd;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">🕒 Tarefa Pendente</div>
            <div class="content">
              <p>Olá {{userName}},</p>
              <p>Você tem uma tarefa pendente no sistema que precisa ser concluída.</p>
              <p><strong>Prazo:</strong> {{deadline}}</p>
              <p><strong>Detalhes:</strong> {{details}}</p>
            </div>
            <div class="footer">
              <p>Para mais informações, acesse: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,

  SUCESSO: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #d4edda;
              color: #155724;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #c3e6cb;
              border-radius: 5px;
              background-color: #d4edda;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">✅ Sucesso</div>
            <div class="content">
              <p> Olá {{userName}},</p>
              <p>Parabéns! A ação solicitada foi concluída com sucesso no sistema.</p>
              <p><strong>Detalhes:</strong> {{details}}</p>
            </div>
            <div class="footer">
              <p>Confira mais detalhes no sistema: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,

  MENSAGEM: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #e2e3e5;
              color: #383d41;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #d6d8db;
              border-radius: 5px;
              background-color: #e2e3e5;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">📩 Nova Mensagem</div>
            <div class="content">
              <p>Olá {{userName}},</p>
              <p>Você recebeu uma nova mensagem no sistema de controle de fluxos de trabalho.</p>
              <p><strong>Mensagem:</strong> {{message}}</p>
            </div>
            <div class="footer">
              <p>Para acessar a mensagem completa, clique aqui: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,

  CONFIRMACAO: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #cce5ff;
              color: #004085;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #b8daff;
              border-radius: 5px;
              background-color: #cce5ff;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .button {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #004085;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">🔗 Confirmação de Adição ao Grupo</div>
            <div class="content">
              <p>Olá {{userName}},</p>
              <p>Você foi convidado para fazer parte do grupo <strong>{{groupName}}</strong>.</p>
              <p>Para confirmar sua entrada no grupo, clique no botão abaixo:</p>
              <a href="{{confirmationLink}}" class="button">Confirmar Entrada</a>
              <p>Se você não deseja fazer parte do grupo, ignore este e-mail.</p>
            </div>
            <div class="footer">
              <p>Acesse o sistema para mais informações: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,

  REVISAO: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #e2e3e5;
              color: #383d41;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
              border: 1px solid #d6d8db;
              border-radius: 5px;
              background-color: #e2e3e5;
              max-width: 600px;
              margin: 20px auto;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p>
                📄 Revisão de Documentos
              </p>
            </div>
            <div class="content">
              <p>Olá {{userName}},</p>
              <p>Você tem um ou mais documentos que precisam de sua revisão no processo {{taskName}}.</p>
            </div>
            <div class="footer">
              <p>Para revisar os documentos, acesse: <a href="{{link}}">{{link}}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
} as const;

export type IEmailOptions = typeof emailOptions;
