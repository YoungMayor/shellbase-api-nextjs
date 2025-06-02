import type { Subcommand } from '@/types';

export const subcommands: Subcommand[] = [
  {
    slug: 'docker-run',
    categorySlug: 'docker',
    name: 'run',
    shortDescription: 'Run a command in a new container.',
    markdownPath: 'docker/run.md',
  },
  {
    slug: 'docker-ps',
    categorySlug: 'docker',
    name: 'ps',
    shortDescription: 'List containers.',
    markdownPath: 'docker/ps.md',
  },
  {
    slug: 'docker-build',
    categorySlug: 'docker',
    name: 'build',
    shortDescription: 'Build an image from a Dockerfile.',
    markdownPath: 'docker/build.md',
  },
];
