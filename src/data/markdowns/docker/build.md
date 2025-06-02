# Docker Build

The `docker build` command builds an image from a Dockerfile and a "context". The build’s context is the set of files at a specified location PATH or URL.

## Usage
`docker build [OPTIONS] PATH | URL | -`

## Common Flags
-   `-t`, `--tag list`: Name and optionally a tag in the 'name:tag' format.
-   `-f`, `--file string`: Name of the Dockerfile (Default is 'PATH/Dockerfile').
-   `--build-arg list`: Set build-time variables.
-   `--no-cache`: Do not use cache when building the image.
-   `--pull`: Always attempt to pull a newer version of the image.

## Examples
Build an image from the current directory:
```bash
docker build -t my-app:latest .
```

Build an image using a specific Dockerfile:
```bash
docker build -f Dockerfile.dev -t my-app:dev .
```

Build an image with build-time arguments:
```bash
docker build --build-arg APP_VERSION=1.2.3 -t my-app:1.2.3 .
```

Build an image from a Git repository:
```bash
docker build -t my-app github.com/username/my-repo#main:my-app-dir
```
