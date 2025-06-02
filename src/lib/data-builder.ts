import { Subcommand } from "@/types";

export function subCommandBuilder(
  categorySlug: string,
  subCommandSlug: string,
  description: string
): Subcommand {
  return {
    slug: `${categorySlug}-${subCommandSlug}`,
    categorySlug,
    name: subCommandSlug,
    shortDescription: description,
    markdownPath: `${categorySlug}/${subCommandSlug}.md`,
  };
}
