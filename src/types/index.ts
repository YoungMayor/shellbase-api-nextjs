
export interface IconSet {
  mdi?: string;
  lucide?: string;
  simple?: string;
  svg?: string; // For custom SVG icons
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: IconSet;
}

export interface Subcommand {
  slug: string; // e.g., "git-tag" - unique identifier for the command
  categorySlug: string; // e.g., "git" - identifies the parent category
  name: string; // e.g., "tag" - human-readable name of the subcommand
  shortDescription: string;
  markdownPath: string; // Relative path to the markdown file, e.g., "git/tag.md"
}

export interface CommandDetail {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  markdown: string;
}

export interface SearchResult {
  type: 'category' | 'subcommand' | 'command';
  id: string; // slug of the item
  title: string;
  description?: string;
  category?: string; // category slug, if applicable
  icon?: IconSet; // for categories
  relevance?: number; // for future sorting
  markdownPreview?: string; // for commands
}
