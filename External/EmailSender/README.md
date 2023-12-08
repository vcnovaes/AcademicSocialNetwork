# emailsender

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Running on docker:

- Build image:

  ```
    sudo docker build -f Dockerfile -t email-sender
  ```

- Run image:
  ```
    sudo docker run --network=host -d email-sender
  ```
  This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
