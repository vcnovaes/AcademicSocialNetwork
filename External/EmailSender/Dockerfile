FROM oven/bun

# Define the working directory
WORKDIR /app

# Copy your application code
COPY ./app /app


# Install dependencies
RUN bun install

# Copy your bun.lock file
COPY ./app/bun.lockb .

# Expose the port your application runs on

# Define the command to run your application
CMD ["bun", "run", "index.ts"]