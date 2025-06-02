# Bash grep

The `grep` command searches for patterns in each file. Patterns are specified by the user, and `grep` prints each line that matches a pattern.

## Usage
`grep [options] PATTERN [FILE...]`

## Common Flags
-   `-i`, `--ignore-case`: Ignore case distinctions in patterns and input data.
-   `-v`, `--invert-match`: Invert the sense of matching, to select non-matching lines.
-   `-r`, `-R`, `--recursive`: Read all files under each directory, recursively.
-   `-n`, `--line-number`: Prefix each line of output with the 1-based line number within its input file.
-   `-c`, `--count`: Suppress normal output; instead print a count of matching lines for each input file.
-   `-l`, `--files-with-matches`: Suppress normal output; instead print the name of each input file from which output would normally have been printed.

## Examples
Search for "error" in `server.log`:
```bash
grep "error" server.log
```

Search for "error" case-insensitively in `server.log`:
```bash
grep -i "error" server.log
```

Search recursively for "TODO" in the current directory:
```bash
grep -r "TODO" .
```

Count lines containing "warning" in `app.log`:
```bash
grep -c "warning" app.log
```

List files containing "debug":
```bash
grep -l "debug" *.py
```
