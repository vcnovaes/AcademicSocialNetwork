from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

# Define downstream service URLs
SERVICE_A_URL = "http://localhost:8000"
SERVICE_B_URL = "http://localhost:8002"

# Gateway endpoint to route requests to downstream services
'''
- Every mapped route should be redirected for the corresponding client 



'''


@app.get("/api/pvt/{service_name}/")
async def gateway(service_name: str):
    if service_name == "service_a":
        return await forward_request(SERVICE_A_URL)
    elif service_name == "service_b":
        return await forward_request(SERVICE_B_URL)
    else:
        raise HTTPException(status_code=404, detail="Service not found")

# Function to forward request to downstream services


async def forward_request(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.text

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
