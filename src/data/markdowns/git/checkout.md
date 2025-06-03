# Git Checkout

The `git checkout` command is used to switch branches or restore working tree files.

## Usage
`git checkout [options] <branch>`
`git checkout [options] [<tree-ish>] [--] <pathspec>…`

## Common Flags
-   `-b <new_branch>`: Create a new branch named `<new_branch>` and switch to it.
-   `-B <new_branch>`: Creates the branch `<new_branch>` and start it at `<start_point>`; if it already exists, then reset it to `<start_point>`. This is equivalent to running "git branch -f <new_branch>", followed by "git checkout <new_branch>".
-   `--track`: When creating a new branch, set up "upstream" configuration.
-   `-`: Switch to the previously checked out branch.

## Examples
Switch to an existing branch:
```bash
git checkout develop
```

Create a new branch and switch to it:
```bash
git checkout -b feature/new-login
```

Switch to the previous branch:
```bash
git checkout -
```

Discard changes in a specific file:
```bash
git checkout -- myfile.txt
```

Checkout a specific commit (detached HEAD state):
```bash
git checkout <commit-hash>
```
