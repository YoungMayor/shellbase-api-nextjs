import { Category, IconSet, Subcommand } from "@/types";

export function categoryBuilder(
  name: string,
  description: string,
  icon: IconSet
): Category {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return { slug, name, description, icon };
}

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
