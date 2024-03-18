from fastapi import FastAPI, HTTPException
from requests import Response
from fastapi.responses import JSONResponse
from configuration import config
import datetime
from data.login import LoginForm
from data.token import JwtToken
from client.cache_client import CacheClient
from core.jwt_provider import JwtProvider
from client.user_service import UserServiceClient
from redis import Redis
from fastapi.middleware.cors import CORSMiddleware


config.load()
app = FastAPI()
cache = CacheClient(
    Redis(host='redis')
)
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

jwt_provider = JwtProvider(
    config.get('CREDENTIAL_TTL', int),
    config.get('SECRET_JWT_KEY', str)
)


@app.post("/pub/authenticate")
async def authenticate(login: LoginForm):
    login_response: Response = UserServiceClient.login(login)
    authenticated = login_response.status_code
    if authenticated != 200:
        raise HTTPException(403)
    user_id = login_response.json()['id']
    jwt = jwt_provider.generate(user_id)
    cache.put(jwt, login.email)
    response = JSONResponse(content=jwt)
    response.set_cookie(key='JamboAuthCookie', value=jwt)
    return {'JamboAuthCookie': jwt, 'user_id': user_id}


@app.post("/validate")
async def validate(token: JwtToken):
    print(token)
    credential = cache.get(token.token)
    if credential != None:
        return {'email': credential, 'jwt': token}
    try:
        decoded_jwt = jwt_provider.decode(token)
        if decoded_jwt.exp < datetime.datetime.utcnow():
            return decoded_jwt
        raise HTTPException(400)
    except:
        raise HTTPException(500)

if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
    except:
        print("Application crashed")
    cache.close()
