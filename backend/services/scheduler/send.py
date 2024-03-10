
#!/usr/bin/env python
import pika
import json

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')
body = {
    "date_time": "2024-03-10 14-19-00",
    "route":"https://jsonplaceholder.typicode.com/todos/1",
    "payload":"abd",
    "action":"get"
}
body = json.dumps(body)

channel.basic_publish(exchange='', routing_key='hello', body=body)
print(" [x] Sent 'Hello World!'")
connection.close()