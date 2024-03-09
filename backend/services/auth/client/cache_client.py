import redis


class CacheClient:
    def __init__(self, connection: redis.Redis) -> None:
        self.client: redis.Redis = connection
        pass

    def put(self, key: str, value: str, ttl: int = 7200):  # default ttl is 2 hours
        self.client.setex(
            key, ttl, value
        )

    def get(self, key: str):
        return self.client.get(key)

    def close(self):
        self.client.close()
