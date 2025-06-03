# Bash cd

The `cd` command changes the current working directory.

## Usage
`cd [options] [directory]`

## Common Behaviors
-   `cd`: Change to the home directory.
-   `cd ~`: Change to the home directory.
-   `cd /path/to/directory`: Change to the specified absolute path.
-   `cd relative/path`: Change to the specified relative path.
-   `cd ..`: Move up one directory level.
-   `cd -`: Change to the previous working directory.

## Examples
Change to the `/var/log` directory:
```bash
cd /var/log
```

Move to the parent directory:
```bash
cd ..
```

Return to the home directory:
```bash
cd
```

Switch to the directory you were previously in:
```bash
cd -
```
