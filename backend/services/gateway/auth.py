import requests
import circuitbreaker
from services import services_map
import json


class IAuthService():
    @staticmethod
    def validate(token):
        pass

    def authenticate(login): pass


class AuthServiceClient(IAuthService):
    base_url = services_map['auth']
    cb = circuitbreaker.CircuitBreaker(failure_threshold=3,
                                       recovery_timeout=10)

    @cb
    @staticmethod
    def authenticate(login):
        return requests.post(AuthServiceClient.base_url + '/authenticate',
                             data=json.dumps(login))

    @cb
    @staticmethod
    async def validate(token) -> requests.Response:
        return requests.post(AuthServiceClient.base_url + '/validate',
                             data=json.dumps(token))
