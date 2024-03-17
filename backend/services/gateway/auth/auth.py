from fastapi import HTTPException
from clients.auth_client import AuthServiceClient
from core.services_provider import ServiceProvider

auth_client = AuthServiceClient(ServiceProvider())


def auth_middleware(jwt: str):
    auth_response = auth_client.validate(jwt)
    if auth_response.status_code != 200:
        return HTTPException(403, 'Forbbiden')
