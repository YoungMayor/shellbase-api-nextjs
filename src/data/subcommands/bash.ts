import type { Subcommand } from '@/types';

export const subcommands: Subcommand[] = [
  {
    slug: 'bash-ls',
    categorySlug: 'bash',
    name: 'ls',
    shortDescription: 'List directory contents.',
    markdownPath: 'bash/ls.md',
  },
  {
    slug: 'bash-cd',
    categorySlug: 'bash',
    name: 'cd',
    shortDescription: 'Change the current directory.',
    markdownPath: 'bash/cd.md',
  },
  {
    slug: 'bash-grep',
    categorySlug: 'bash',
    name: 'grep',
    shortDescription: 'Print lines matching a pattern.',
    markdownPath: 'bash/grep.md',
  },
];
