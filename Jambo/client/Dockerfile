# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /jambo-client
# Copy your application code
COPY ./jambo-client /jambo-client

RUN bun install 

EXPOSE 5173/tcp
ENTRYPOINT [ "bun", "run", "dev" ]
