import { subCommandBuilder } from "@/lib/data-builder";
import type { Subcommand } from "@/types";

const bashSubCommand = (subcommandSlug: string, description: string) =>
  subCommandBuilder("bash", subcommandSlug, description);

export const subcommands: Subcommand[] = [
  bashSubCommand("cd", "Change the current directory."),
  bashSubCommand("grep", "Print lines matching a pattern."),
  bashSubCommand("ls", "List directory contents."),
];
