import redis

# Replace these values with your Redis server details
redis_host = 'localhost'
redis_port = 6379

# Create a Redis client
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)

# Example usage: set a key, get the value, and print it
key = 'exampleKey'
value = 'exampleValue'

redis_client.set(key, value)

# Get the value of the key
result = redis_client.get(key)
print(f'Value of key {key}: {result}')

# Close the connection
redis_client.connection_pool.disconnect()
