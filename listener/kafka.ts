import { Kafka, EachMessagePayload } from 'kafkajs';
import { performance } from 'perf_hooks';
import {measureCPUUsage, measureMemoryUsage, simpleEffort} from "./util";

const numRequestsToMeasure = 1;

const kafka = new Kafka({
    clientId: 'consumerClient',
    brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function listen() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false });

    const startTime = performance.now();
    const startUsage = process.cpuUsage();

    let numRequests = 0;

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            if (message?.value === null) {
                return;
            }
            simpleEffort(message.value.toString())
            console.log(message.value.toString())
            numRequests++;


            if (numRequests === numRequestsToMeasure) {
                const elapsedTime = performance.now() - startTime;
                const averageMemoryUsage = measureMemoryUsage();
                const averageCPUUsage = measureCPUUsage(startTime, startUsage);

                console.log('Average Memory Usage:', averageMemoryUsage);
                console.log('Average CPU Usage:', averageCPUUsage + '%');
                console.log('Elapsed Time:', elapsedTime.toFixed(4) + 'ms');

                await consumer.disconnect();
                process.exit();
            }
        },
    });
}


// Start listening
listen().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
