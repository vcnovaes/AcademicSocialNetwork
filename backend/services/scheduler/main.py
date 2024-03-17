from typing import Union
from fastapi import FastAPI, HTTPException
import pika
import sys
import os
from schedulerModel import SchedulerModel
import json
from datetime import datetime
import requests
from send import publish, publish_connection
from threading import Thread
from receive import consumer


app = FastAPI()


def begin_main():
    import uvicorn
    global app
    uvicorn.run(app, host="0.0.0.0", port=8089)
    publish_connection.close()


@app.post("/pvt/schedule")
async def schedule_request(schedule: SchedulerModel):
    publish(schedule)


if __name__ == "__main__":
    api_thread = Thread(target=begin_main)
    consumer_thread = Thread(target=consumer)
    api_thread.start()
    consumer_thread.start()
