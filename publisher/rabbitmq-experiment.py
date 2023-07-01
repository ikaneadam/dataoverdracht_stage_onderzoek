import pika
import json

from memory_profiler import profile

from util import simple_effort, measure_performance

rabbitmq_host = 'localhost'
rabbitmq_port = 5672
rabbitmq_queue = 'test-queue'

connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host, port=rabbitmq_port))
channel = connection.channel()
channel.queue_declare(queue=rabbitmq_queue)


@profile
def publish_events(amount_of_messages):
    for i in range(amount_of_messages):
        message = simple_effort()
        message = json.dumps(message)
        channel.basic_publish(exchange='', routing_key=rabbitmq_queue, body=message)
    connection.close()


amount = 1

publish_events(amount)
