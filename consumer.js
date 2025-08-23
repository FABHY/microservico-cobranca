const amqp = require('amqplib');

// Substitua esta URL pela sua URL do CloudAMQP
const AMQP_URL = 'amqps://wwlubxth:K-y3oP5ICsWci48J2eKF9oWrr85Zu6sa@jackal.rmq.cloudamqp.com/wwlubxth';


const QUEUE_NAME = 'cobranca_fila';

async function startConsumer() {
    try {
        const connection = await amqp.connect(AMQP_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log('[*] Aguardando por mensagens na fila. Para sair, pressione CTRL+C');

        channel.consume(QUEUE_NAME, (msg) => {
            // Verifica se a mensagem não é nula e se o seu conteúdo existe
            if (msg !== null && msg.content) {
                const dadosCobranca = JSON.parse(msg.content.toString());
                console.log('--- Nova Mensagem Recebida ---');
                console.log('Processando cobrança para:', dadosCobranca.cliente.nome);
                console.log('Produto em atraso:', dadosCobranca.produto.nome);
                console.log('Tempo de atraso:', dadosCobranca.tempoAtraso);
                console.log('Valor total:', dadosCobranca.valores.total);

                // Acknowledge a mensagem para removê-la da fila
                channel.ack(msg);
            } else {
                // Se a mensagem for inválida, apenas a rejeite.
                console.error("Mensagem inválida recebida, rejeitando...");
                channel.nack(msg);
            }
        }, {
            noAck: false // Desabilita o auto-ack para garantir o processamento
        });

    } catch (error) {
        console.error('Erro ao iniciar o consumidor:', error);
    }
}

startConsumer();