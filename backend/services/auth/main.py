from fastapi import FastAPI, HTTPException
from configuration import config
from data.token import JwtToken
from data.redis import RedisClient


config.load()
app = FastAPI()
redis = RedisClient()


@app.get("/")
async def validate(token: JwtToken):

    pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
