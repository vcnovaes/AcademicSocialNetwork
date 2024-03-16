from typing import Annotated, Any, Optional
from fastapi import Body, FastAPI, HTTPException, Header
from core.services_provider import ServiceProvider
from core.request_builder import RequestBuilder
from services import NewPostModel
import auth
from services import services_map
from fastapi.middleware.cors import CORSMiddleware
import requests
import json


app = FastAPI()
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
service_provider = ServiceProvider()


def auth_middleware(jwt: str):
    auth_response = auth.AuthServiceClient.validate(jwt)
    if auth_response.status_code != 200:
        return HTTPException(403, 'Forbbiden')
    author = auth_response.email
    new_post_payload = NewPostModel(author, jwt)


def visibility_handle(path: str, auth_cookie: str):
    if path[:3] == 'pvt':
        auth_middleware(auth_cookie)
    if path[:3] not in {'pub', 'pvt'}:
        return HTTPException(404)
    pass


@app.get("/api/{service_name}/{path:path}")
def get_request(service_name: str, path:  Optional[str] = None, JamboAuthCookie: Annotated[str | None, Header(convert_underscores=False)] = None):
    visibility_handle(path, JamboAuthCookie)
    return RequestBuilder(
        service_provider=service_provider,
        service_name=service_name,
        method='get',
        route=path
    ).execute()


@app.post("/api/{service_name}/{path:path}")
def post_request(service_name: str, path:  Optional[str] = None,
                 JamboAuthCookie: Annotated[str | None, Header(convert_underscores=False)] = None, request_body: Any = Body(None)):
    visibility_handle(path, JamboAuthCookie)
    return RequestBuilder(
        service_provider=service_provider,
        service_name=service_name,
        method='post',
        route=path,
        body=request_body
    ).execute()


@app.put("/api/{service_name}/{path:path}")
def put_request(service_name: str, path:  Optional[str] = None,
                JamboAuthCookie: Annotated[str | None, Header(convert_underscores=False)] = None, request_body: Any = Body(None)):

    visibility_handle(path, JamboAuthCookie)
    return RequestBuilder(
        service_provider=service_provider,
        service_name=service_name,
        method='put',
        route=path,
        request_body=request_body
    ).execute()


@app.delete("/api/{service_name}/{path:path}")
def delete_request(service_name: str, path:  Optional[str] = None,
                   JamboAuthCookie: Annotated[str | None, Header(convert_underscores=False)] = None, request_body: Any = Body(None)):
    visibility_handle(path, JamboAuthCookie)
    return RequestBuilder(
        service_provider=service_provider,
        service_name=service_name,
        method='delete',
        route=path,
        request_body=request_body
    ).execute()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
