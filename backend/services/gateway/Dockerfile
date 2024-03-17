FROM python:3.10-slim

WORKDIR /

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY auth/ ./auth
COPY clients/ ./clients
COPY core/ ./core
COPY services.json ./
COPY main.py ./

EXPOSE 8000

ENTRYPOINT ["python", "main.py"]
