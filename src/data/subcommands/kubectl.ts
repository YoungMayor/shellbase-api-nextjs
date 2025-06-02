import { subCommandBuilder } from "@/lib/data-builder";
import type { Subcommand } from "@/types";

const kubectlSubCommand = (subcommandSlug: string, description: string) =>
  subCommandBuilder("kubectl", subcommandSlug, description);

export const subcommands: Subcommand[] = [
  kubectlSubCommand(
    "apply",
    "Apply a configuration to a resource by filename or stdin."
  ),
  kubectlSubCommand(
    "describe",
    "Show details of a specific resource or group of resources."
  ),
  kubectlSubCommand("get", "Display one or many resources."),
];
