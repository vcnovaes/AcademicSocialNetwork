# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /app
# Copy your application code
COPY ./app /app

RUN bun install 
RUN bun add amqplib @types/amqplib
RUN bunx prisma migrate dev --name migration
RUN bunx prisma generate

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "./src/index.ts" ]
