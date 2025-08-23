const amqp = require('amqplib');

/**
 * Publica uma mensagem de cobrança na fila do RabbitMQ.
 * @param {object} data - Os dados do cliente e da cobrança.
 * @param {string} amqpUrl - A URL de conexão do CloudAMQP.
 */
async function publishMessage(data, amqpUrl) {
    let connection;
    try {
        connection = await amqp.connect(amqpUrl);
        const channel = await connection.createConfirmChannel(); // <-- Alterado para canal de confirmação

        const QUEUE_NAME = 'cobranca_fila';

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        // Envia a mensagem e espera por uma confirmação do RabbitMQ
        await new Promise((resolve, reject) => {
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
                persistent: true
            }, (err, ok) => {
                if (err) {
                    console.error('Mensagem não foi confirmada pelo servidor:', err);
                    reject(err);
                } else {
                    console.log(`[x] Mensagem enviada e confirmada para a fila: '${QUEUE_NAME}'`);
                    console.log('Dados:', data.cliente.nome);
                    resolve();
                }
            });
        });

    } catch (error) {
        console.error('Erro ao publicar mensagem:', error);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = {
    publishMessage
};