
import pika
import json
from schedulerModel import SchedulerModel

publish_connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = publish_connection.channel()
channel.queue_declare(queue='schedule')


def publish(body: SchedulerModel):
    channel.basic_publish(exchange='', routing_key='schedule', body=body.model_dump_json())


