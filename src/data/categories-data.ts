import type { Category } from '@/types';
import { gitIcons, bashIcons, dockerIcons, kubectlIcons } from './icons';

export const categories: Category[] = [
  {
    slug: 'git',
    name: 'Git',
    description: 'Distributed version control system for tracking changes in source code.',
    icon: gitIcons,
  },
  {
    slug: 'bash',
    name: 'Bash',
    description: 'Unix shell and command language for interacting with the operating system.',
    icon: bashIcons,
  },
  {
    slug: 'docker',
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications in containers.',
    icon: dockerIcons,
  },
  {
    slug: 'kubectl',
    name: 'Kubectl',
    description: 'Command-line tool for controlling Kubernetes clusters.',
    icon: kubectlIcons,
  },
];
