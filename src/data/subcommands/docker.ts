import { subCommandBuilder } from "@/lib/data-builder";
import type { Subcommand } from "@/types";

const dockerSubCommand = (subcommandSlug: string, description: string) =>
  subCommandBuilder("docker", subcommandSlug, description);

export const subcommands: Subcommand[] = [
  dockerSubCommand("build", "Build an image from a Dockerfile."),
  dockerSubCommand("ps", "List containers."),
  dockerSubCommand("run", "Run a command in a new container."),
];
