# Bash ls

The `ls` command lists directory contents.

## Usage
`ls [options] [file|dir ...]`

## Common Flags
-   `-l`: Use a long listing format.
-   `-a`: Do not ignore entries starting with ..
-   `-A`: Do not list implied . and ...
-   `-h`: With -l and/or -s, print human readable sizes (e.g., 1K 234M 2G).
-   `-t`: Sort by modification time, newest first.
-   `-R`: Recursively list subdirectories.

## Examples
List files in the current directory:
\`\`\`bash
ls
\`\`\`

List all files (including hidden) in long format:
\`\`\`bash
ls -la
\`\`\`

List files with human-readable sizes:
\`\`\`bash
ls -lh
\`\`\`

List files sorted by modification time (newest first):
\`\`\`bash
ls -lt
\`\`\`
