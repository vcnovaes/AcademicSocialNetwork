from data.login import LoginForm
import requests as req
from requests import Response
import json
from circuitbreaker import CircuitBreaker


class UserServiceClient:
    baseURL = 'http://localhost:8081'
    failure_threshold = 5
    recovery_timeout = 30
    cb = CircuitBreaker(failure_threshold=failure_threshold,
                        recovery_timeout=recovery_timeout)

    @staticmethod
    def get_url(route: str) -> str:
        return UserServiceClient.baseURL + route

    @staticmethod
    @cb
    def login(login: LoginForm) -> Response:
        serializable = login.model_dump_json()
        return req.post(
            UserServiceClient.get_url('/login'),
            serializable
        )
