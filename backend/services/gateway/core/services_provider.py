import json

import os


class ServiceProvider:
    def __load_service_files(self):

        file = open('services.json')
        data = json.load(file)
        file.close()
        return data

    def __init__(self) -> None:
        self.services = self.__load_service_files()
        pass

    def get(self, service_name):
        return self.services[service_name]
