import amqp, {Connection, Channel, ConsumeMessage, Message} from 'amqplib/callback_api';
import { performance } from 'perf_hooks';
import { measureCPUUsage, measureMemoryUsage, simpleEffort } from './util';

const numRequestsToMeasure = 1;

const rabbitMQHost = 'amqp://localhost';
const rabbitMQQueue = 'test-queue';

async function listen() {
    const startTime = performance.now();
    const startUsage = process.cpuUsage();
    let numRequests = 0;
    amqp.connect(rabbitMQHost, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(rabbitMQQueue, {
                durable: false
            });


            channel.consume(rabbitMQQueue, function(msg: Message | null) {
                if (msg === null) {
                    return;
                }
                simpleEffort(msg.toString())
                console.log(msg.toString())
                numRequests++;


                if (numRequests === numRequestsToMeasure) {
                    const elapsedTime = performance.now() - startTime;
                    const averageMemoryUsage = measureMemoryUsage();
                    const averageCPUUsage = measureCPUUsage(startTime, startUsage);

                    console.log('Average Memory Usage:', averageMemoryUsage);
                    console.log('Average CPU Usage:', averageCPUUsage + '%');
                    console.log('Elapsed Time:', elapsedTime.toFixed(4) + 'ms');
                    process.exit();
                }
            }, {
                noAck: true
            });
        });
    });
}


listen().catch((error: Error) => {
    console.error('Error:', error);
    process.exit(1);
});
