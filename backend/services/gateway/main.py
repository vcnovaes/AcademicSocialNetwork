from typing import Annotated
from fastapi import FastAPI, HTTPException, Header
import httpx
import auth
app = FastAPI()

# Define downstream service URLs
SERVICE_A_URL = "http://localhost:8000"
SERVICE_B_URL = "http://localhost:8002"

# Gateway endpoint to route requests to downstream services
'''
- Every mapped route should be redirected for the corresponding client 



'''


@app.post("/api/pvt/{service_name}/new_post")
async def create(service_name: str, JamboAuthCookie: Annotated[str | None, Header(convert_underscores=False)] = None):
    is_valid = auth.AuthServiceClient.validate(JamboAuthCookie)
    if is_valid.status_code != 200:
        return HTTPException(403, 'Forbbiden')

# Function to forward request to downstream services


async def forward_request(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.text

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
