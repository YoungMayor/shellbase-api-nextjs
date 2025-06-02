# Docker Run

The `docker run` command creates a writeable container layer over the specified image, and then starts it using the specified command.

## Usage
`docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

## Common Flags
-   `-d`, `--detach`: Run container in background and print container ID.
-   `-p`, `--publish list`: Publish a container's port(s) to the host (e.g., `-p 8080:80`).
-   `-v`, `--volume list`: Bind mount a volume (e.g., `-v /host/path:/container/path`).
-   `--name string`: Assign a name to the container.
-   `-e`, `--env list`: Set environment variables.
-   `--rm`: Automatically remove the container when it exits.
-   `-it`: Combination of `-i` (interactive) and `-t` (pseudo-TTY), commonly used for interactive shells.

## Examples
Run an Nginx container in detached mode, mapping port 8080 on host to 80 in container:
\`\`\`bash
docker run -d -p 8080:80 --name my-nginx nginx
\`\`\`

Run an Ubuntu container interactively and get a shell:
\`\`\`bash
docker run -it ubuntu bash
\`\`\`

Run a container that executes a command and then removes itself:
\`\`\`bash
docker run --rm alpine echo "Hello from Alpine"
\`\`\`

Run a container with a bind mount:
\`\`\`bash
docker run -v $(pwd)/app:/usr/src/app my-app-image
\`\`\`
