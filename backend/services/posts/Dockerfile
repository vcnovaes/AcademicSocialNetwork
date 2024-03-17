FROM python:3.9-slim

WORKDIR /

COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy the application code
COPY configuration/ ./configuration
COPY data/ ./data
COPY main.py ./

# Expose the port where FastAPI listens (typically 8000)
EXPOSE 8082

# Set the main script as the entrypoint
ENTRYPOINT ["python", "main.py"]
