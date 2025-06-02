import type { Subcommand } from '@/types';

export const subcommands: Subcommand[] = [
  {
    slug: 'kubectl-get',
    categorySlug: 'kubectl',
    name: 'get',
    shortDescription: 'Display one or many resources.',
    markdownPath: 'kubectl/get.md',
  },
  {
    slug: 'kubectl-describe',
    categorySlug: 'kubectl',
    name: 'describe',
    shortDescription: 'Show details of a specific resource or group of resources.',
    markdownPath: 'kubectl/describe.md',
  },
  {
    slug: 'kubectl-apply',
    categorySlug: 'kubectl',
    name: 'apply',
    shortDescription: 'Apply a configuration to a resource by filename or stdin.',
    markdownPath: 'kubectl/apply.md',
  },
];
