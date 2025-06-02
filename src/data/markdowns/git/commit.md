# Git Commit

The `git commit` command captures a snapshot of the project's currently staged changes.

## Usage
`git commit [options]`

## Common Flags
-   `-m <msg>`: Use the given `<msg>` as the commit message.
-   `-a`, `--all`: Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected.
-   `--amend`: Replace the tip of the current branch by creating a new commit.

## Examples
Commit staged changes with a message:
```bash
git commit -m "Implemented user authentication"
```

Stage all tracked files and commit:
```bash
git commit -a -m "Fixed typos in documentation"
```

Amend the last commit:
```bash
git commit --amend -m "Corrected commit message for user auth"
```
