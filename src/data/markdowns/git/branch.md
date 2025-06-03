# Git Branch

The `git branch` command lets you create, list, rename, and delete branches.

## Usage
`git branch [options] [<branchname>]`

## Common Flags
-   `-l`, `--list`: List branches.
-   `-d`, `--delete`: Delete a branch. The branch must be fully merged in its upstream branch, or in `HEAD` if no upstream was set.
-   `-D`: Shortcut for `--delete --force`.
-   `-m`, `--move`: Move/rename a branch and the corresponding reflog.
-   `-M`: Shortcut for `--move --force`.
-   `-a`, `--all`: List both remote-tracking branches and local branches.

## Examples
List all local branches:
```bash
git branch
```

List all branches (local and remote):
```bash
git branch -a
```

Create a new branch:
```bash
git branch new-feature
```

Delete a branch:
```bash
git branch -d old-feature
```

Rename a branch:
```bash
git branch -m old-name new-name
```
