const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();
app.use(express.json())

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'my-app' })

async function run(){

    await consumer.connect()
    await consumer.subscribe({ topic: 'restaurant' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })
}

run();




// app.listen(3001, () => {
//     console.log('Consumer server has started');
// });

