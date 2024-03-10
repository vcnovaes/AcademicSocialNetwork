import pika, sys, os
from schedulerModel import SchedulerModel 
import json
from datetime import datetime
import requests

def passou_da_hora(hora_atual, hora_agendada):

  try:
    hora_atual = datetime.strptime(hora_atual, '%Y-%m-%d %H-%M-%S')
    hora_agendada = datetime.strptime(hora_agendada, '%Y-%m-%d %H-%M-%S')
  except ValueError:
    raise ValueError('Formato de data/hora inválido.')

  return hora_atual >= hora_agendada

def consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='schedule')

    def callback(ch, method, properties, body):
        d = json.loads(body)
        obj = SchedulerModel(**d)
        if passou_da_hora(datetime.now().strftime('%Y-%m-%d %H-%M-%S'), obj.date_time):
            print("enviando requisição")
            response = None
            match obj.action.lower():
                case "post":
                    response = requests.post(obj.route,obj.payload)
                case "get":
                    response = requests.get(obj.route)
                case _:
                    print("operation not supported")
            print("response: ", response.json())
        else:
            channel.basic_publish(exchange='', routing_key='schedule', body=body)

    channel.basic_consume(queue='schedule', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()



