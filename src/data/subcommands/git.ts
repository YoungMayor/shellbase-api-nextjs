import type { Subcommand } from '@/types';

export const subcommands: Subcommand[] = [
  {
    slug: 'git-commit',
    categorySlug: 'git',
    name: 'commit',
    shortDescription: 'Record changes to the repository.',
    markdownPath: 'git/commit.md',
  },
  {
    slug: 'git-branch',
    categorySlug: 'git',
    name: 'branch',
    shortDescription: 'List, create, or delete branches.',
    markdownPath: 'git/branch.md',
  },
  {
    slug: 'git-tag',
    categorySlug: 'git',
    name: 'tag',
    shortDescription: 'Create, list, delete or verify a tag object signed with GPG.',
    markdownPath: 'git/tag.md',
  },
  {
    slug: 'git-checkout',
    categorySlug: 'git',
    name: 'checkout',
    shortDescription: 'Switch branches or restore working tree files.',
    markdownPath: 'git/checkout.md',
  },
];
