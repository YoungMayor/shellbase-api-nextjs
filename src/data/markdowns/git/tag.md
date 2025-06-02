# Git Tag

The `git tag` command is used to create, list, delete or verify a tag object signed with GPG. Tags are used to mark specific points in a repository’s history as being important, typically used for releases.

## Usage
`git tag [options] [<tagname>] [<commit-ish>]`

## Common Flags
-   `-l`, `--list`: List tags.
-   `-a <tagname>`, `--annotate <tagname>`: Make an unsigned, annotated tag object.
-   `-s <tagname>`, `--sign <tagname>`: Make a GPG-signed tag, using the default e-mail address’s key.
-   `-d <tagname>`, `--delete <tagname>`: Delete existing tags with the given names.
-   `-v <tagname>`, `--verify <tagname>`: Verify the GPG signature of the given tag names.

## Examples
List all tags:
\`\`\`bash
git tag
\`\`\`

Create a lightweight tag:
\`\`\`bash
git tag v1.0.0
\`\`\`

Create an annotated tag:
\`\`\`bash
git tag -a v1.0.1 -m "Version 1.0.1 release"
\`\`\`

Tag an older commit:
\`\`\`bash
git tag -a v0.9 <commit-hash> -m "Version 0.9 on an older commit"
\`\`\`

Delete a tag:
\`\`\`bash
git tag -d v1.0.0
\`\`\`

Push a specific tag to remote:
\`\`\`bash
git push origin v1.0.1
\`\`\`

Push all tags to remote:
\`\`\`bash
git push origin --tags
\`\`\`
