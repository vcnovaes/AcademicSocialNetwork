import pika
import json
import time


def publish_message():
    # RabbitMQ connection parameters
    connection_params = pika.ConnectionParameters('localhost', 5672)

    # Create a connection to RabbitMQ server
    connection = pika.BlockingConnection(connection_params)

    # Create a channel
    channel = connection.channel()

    # Declare a queue
    queue_name = 'EmailSender'

    # Message to be published

    data = {
        "reciever": "mock_example@gmail.com",
        "subject": "SUBJECT__",
        "message": "-MESSAGE--",
    }
    strg = json.dumps(data)
    # Publish the message to the queue
    channel.basic_publish(exchange='', routing_key=queue_name, body=strg)

    print(f"Message '{strg}' published to the queue '{queue_name}'")

    # Close the connection
    connection.close()


# Run the publish_message function
for i in range(0, 5):
    publish_message()
    time.sleep(60)
