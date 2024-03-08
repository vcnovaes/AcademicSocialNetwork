import redis
from configuration import config


class RedisClient:
    def __init__(self) -> None:
        self.client = redis.Redis(config.get('REDIS_URL', str))
        self.ttl = config.get('TTL', int)

    def add(self, key: str, value: str):
        self.client.set(key, value, ex=self.ttl)

    def get(self, key):
        return self.client.get(key)
