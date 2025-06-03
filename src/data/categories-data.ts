import type { Category } from "@/types";
import { gitIcons, bashIcons, dockerIcons, kubectlIcons } from "./icons";
import { categoryBuilder } from "@/lib/data-builder";

export const categories: Category[] = [
  categoryBuilder(
    "Bash",
    "Unix shell and command language for interacting with the operating system.",
    bashIcons
  ),

  categoryBuilder(
    "Docker",
    "Platform for developing, shipping, and running applications in containers.",
    dockerIcons
  ),

  categoryBuilder(
    "Git",
    "Distributed version control system for tracking changes in source code.",
    gitIcons
  ),

  categoryBuilder(
    "Kubectl",
    "Command-line tool for controlling Kubernetes clusters.",
    kubectlIcons
  ),
];
