Microsserviço de Cobrança Automatizada
📖 Visão Geral do Projeto
Este projeto implementa um Microsserviço de Cobrança que automatiza o processo de notificação de clientes com pagamentos em atraso. Ele utiliza uma arquitetura baseada em mensageria (RabbitMQ) e um agendador (Cron) para desacoplar a busca de dados do envio de comunicações, garantindo um sistema resiliente e escalável.

O fluxo principal é o seguinte:

O Agendador verifica periodicamente o banco de dados.

Para cada cliente em atraso, o Publicador envia uma mensagem para a fila do RabbitMQ.

O Consumidor recebe a mensagem da fila e dispara um e-mail de notificação para o cliente.

🛠️ Tecnologias Utilizadas
Componente	Tecnologia	Uso
Linguagem	Node.js	Backend do Microsserviço
Agendamento	node-cron	Agendar a busca de clientes a cada 5 segundos
Banco de Dados	MySQL (mysql2)	Armazenamento e busca de clientes em atraso
Mensageria	RabbitMQ (amqplib)	Fila de mensagens para comunicação assíncrona
Envio de E-mail	Nodemailer	Envio de notificações de cobrança por e-mail

Microsserviço de Cobrança Automatizada
📖 Visão Geral do Projeto
Este projeto implementa um Microsserviço de Cobrança que automatiza o processo de notificação de clientes com pagamentos em atraso. Ele utiliza uma arquitetura baseada em mensageria (RabbitMQ) e um agendador (Cron) para desacoplar a busca de dados do envio de comunicações, garantindo um sistema resiliente e escalável.

O fluxo principal é o seguinte:

O Agendador verifica periodicamente o banco de dados.

Para cada cliente em atraso, o Publicador envia uma mensagem para a fila do RabbitMQ.

O Consumidor recebe a mensagem da fila e dispara um e-mail de notificação para o cliente.

🛠️ Tecnologias Utilizadas
Componente	Tecnologia	Uso
Linguagem	Node.js	Backend do Microsserviço
Agendamento	node-cron	Agendar a busca de clientes a cada 5 segundos
Banco de Dados	MySQL (mysql2)	Armazenamento e busca de clientes em atraso
Mensageria	RabbitMQ (amqplib)	Fila de mensagens para comunicação assíncrona
Envio de E-mail	Nodemailer	Envio de notificações de cobrança por e-mail

Exportar para as Planilhas
🚀 Estrutura de Arquivos
Arquivo	Descrição
package.json	Lista de dependências e scripts do projeto
scheduler.js	Agendador (Scheduler): Conecta ao MySQL, busca clientes em atraso e publica a mensagem na fila.
publisher.js	Publicador (Publisher): Conecta ao RabbitMQ e envia a mensagem de cobrança para a fila cobranca_fila.
consumer.js	Consumidor (Consumer): Fica escutando a fila, processa a mensagem e envia o e-mail de notificação via Nodemailer.

⚙️ Configuração e Instalação
1. Pré-requisitos
Node.js (versão compatível com as dependências).

Um servidor MySQL rodando.

Acesso a uma instância do RabbitMQ (CloudAMQP é usado neste exemplo, mas qualquer servidor AMQP funciona).

Uma conta de e-mail (Gmail) com Senha de App gerada para uso com o Nodemailer.

2. Instalação das Dependências
No diretório raiz do projeto, execute o comando para instalar as dependências:

Bash

npm install

3. Configuração (Ajuste o Código)
⚠️ ALERTA DE SEGURANÇA: As credenciais estão hardcoded e devem ser movidas para variáveis de ambiente (.env) em uma versão de produção.

Ajuste as configurações nos respectivos arquivos:

Componente	Arquivo	Variáveis a serem ajustadas
RabbitMQ URL	scheduler.js e consumer.js	AMQP_URL (Sua URL do CloudAMQP)
MySQL	scheduler.js	mysqlConfig (host, user, password, database)
Nodemailer	consumer.js	transporter auth.user e auth.pass (Seu e-mail e Senha de App)

CONTATO 
E-MAIL: fabiohypolito2021@outlook.com
TEL./WHATSAPP: (11) 93218-5499 
