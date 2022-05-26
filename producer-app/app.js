const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();
app.use(express.json())


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
});

const producer = kafka.producer();



app.post('/send', async function (req, res) {

    console.log(req.body)
    await producer.connect();
    await producer.send({
        topic: 'restaurant',
        messages: [
            { value: req.body.message },
        ],
    })
    res.send('Your order has sent');
});

app.listen(3000, () => {
    console.log('Producer server has started');
});

