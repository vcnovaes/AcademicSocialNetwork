import requests
import circuitbreaker
import json


class IAuthService():
    def validate(token):
        pass

    def authenticate(login): pass


cb = circuitbreaker.CircuitBreaker(failure_threshold=3,
                                   recovery_timeout=10)


class AuthServiceClient(IAuthService):
    def __init__(self, service_provider) -> None:
        super().__init__()
        self.base_url = service_provider.get('auth')

    @cb
    def authenticate(self, login):
        return requests.post(self.base_url + '/authenticate',
                             data=json.dumps(login))

    @cb
    def validate(self, token) -> requests.Response:
        return requests.post(self.base_url + '/validate',
                             data=json.dumps(token))
