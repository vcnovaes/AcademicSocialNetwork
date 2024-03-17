
import pika
import json
from schedulerModel import SchedulerModel

publish_connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq'))
channel = publish_connection.channel()
channel.queue_declare(queue='scheduler')


def publish(body: SchedulerModel):
    channel.basic_publish(
        exchange='', routing_key='scheduler', body=body.model_dump_json())
