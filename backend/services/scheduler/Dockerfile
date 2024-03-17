FROM python:3.10-slim

WORKDIR /

COPY / ./
RUN pip install -r requirements.txt

EXPOSE 8089

# Set the main script as the entrypoint
ENTRYPOINT ["python", "main.py"]
