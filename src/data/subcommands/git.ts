import { subCommandBuilder } from "@/lib/data-builder";
import type { Subcommand } from "@/types";

const gitSubCommand = (subCommandSlug: string, description: string) =>
  subCommandBuilder("git", subCommandSlug, description);

export const subcommands: Subcommand[] = [
  gitSubCommand("branch", "List, create, or delete branches."),
  gitSubCommand("checkout", "Switch branches or restore working tree files."),
  gitSubCommand("commit", "Record changes to the repository."),
  gitSubCommand(
    "tag",
    "Create, list, delete or verify a tag object signed with GPG."
  ),
];
