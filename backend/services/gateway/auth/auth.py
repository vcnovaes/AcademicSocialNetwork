from fastapi import HTTPException
from clients.auth_client import AuthServiceClient
from core.services_provider import ServiceProvider
from requests import Response
auth_client = AuthServiceClient(ServiceProvider())


def auth_middleware(jwt: str):
    auth_response: Response = auth_client.validate(jwt)
    if auth_response.status_code != 200 or len(jwt) == 0:
        raise HTTPException(403, 'Forbbiden')
