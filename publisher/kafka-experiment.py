import json

from confluent_kafka import Producer
from memory_profiler import profile

from util import measure_performance, simple_effort

# Configure the Kafka producer
producer = Producer({
    'bootstrap.servers': 'localhost:29092',  # Replace with your Kafka broker(s)
    'client.id': 'producerClient',
})

topic = 'test-topic'


@measure_performance
def publish_events(amount_of_messages):
    for i in range(amount_of_messages):
        message = simple_effort()
        message = json.dumps(message)
        producer.produce(topic, key=None, value=message)
    producer.flush()


amount = 1

publish_events(amount)
