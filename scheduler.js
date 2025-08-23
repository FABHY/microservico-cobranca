const cron = require('node-cron');
const { publishMessage } = require('./publisher');

// Substitui a URL pela  URL de conexão completa do CloudAMQP.
const AMQP_URL = 'amqps://wwlubxth:K-y3oP5ICsWci48J2eKF9oWrr85Zu6sa@jackal.rmq.cloudamqp.com/wwlubxth';

// Array de dados de cobrança. Em um sistema real, esses dados viriam de um banco de dados.
const clientesParaCobrar = [
    {
        cliente: {
            nome: 'Ana Souza',
            email: 'ana.souza@exemplo.com'
        },
        produto: {
            nome: 'Serviço de Streaming'
        },
        valores: {
            principal: 45.90,
            juros: 4.50,
            total: 50.40
        },
        tempoAtraso: '15 dias'
    },
    {
        cliente: {
            nome: 'Carlos Lima',
            email: 'carlos.lima@exemplo.com'
        },
        produto: {
            nome: 'Plano de Saúde'
        },
        valores: {
            principal: 250.00,
            juros: 25.00,
            total: 275.00
        },
        tempoAtraso: '60 dias'
    },
    {
        cliente: {
            nome: 'Fernanda Dantas',
            email: 'fernanda.dantas@exemplo.com'
        },
        produto: {
            nome: 'Consultoria Financeira'
        },
        valores: {
            principal: 900.00,
            juros: 0.00,
            total: 900.00
        },
        tempoAtraso: '7 dias'

        
    },
    
];

// O Agendador. Ele irá rodar a cada 5 segundos.
cron.schedule('*/5 * * * * *', () => {
    console.log('--- Executando a tarefa de agendamento ---');

    // Itera sobre cada cliente no array e envia uma mensagem de cobrança para a fila.
    clientesParaCobrar.forEach(cliente => {
        publishMessage(cliente, AMQP_URL);
    });

}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

console.log('Agendador de cobranças iniciado. Ele irá rodar a cada 5 segundos e enviar mensagens para todos os clientes na lista.');