# Docker ps

The `docker ps` command lists containers.

## Usage
`docker ps [OPTIONS]`

## Common Flags
-   `-a`, `--all`: Show all containers (default shows just running).
-   `-q`, `--quiet`: Only display container IDs.
-   `-s`, `--size`: Display total file sizes.
-   `--filter`, `-f`: Filter output based on conditions (e.g., `--filter "status=exited"`).
-   `--format string`: Pretty-print containers using a Go template.

## Examples
List running containers:
\`\`\`bash
docker ps
\`\`\`

List all containers (running and stopped):
\`\`\`bash
docker ps -a
\`\`\`

List only container IDs of all containers:
\`\`\`bash
docker ps -aq
\`\`\`

List containers that have exited:
\`\`\`bash
docker ps -f "status=exited"
\`\`\`

List containers with a specific name:
\`\`\`bash
docker ps -f "name=my-nginx"
\`\`\`

List containers using a custom format:
\`\`\`bash
docker ps --format "{{.ID}}: {{.Image}} ({{.Status}})"
\`\`\`
