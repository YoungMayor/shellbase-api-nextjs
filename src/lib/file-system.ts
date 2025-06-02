import fs from 'fs/promises';
import path from 'path';
import type { Subcommand, Category, CommandDetail } from '@/types';
import { categories as allCategoriesData } from '@/data/categories-data';

const dataDir = path.join(process.cwd(), 'src', 'data');
const markdownsDir = path.join(dataDir, 'markdowns');
const subcommandsDataDir = path.join(dataDir, 'subcommands');

export async function readMarkdownFile(markdownFilePath: string): Promise<string> {
  const fullPath = path.join(markdownsDir, markdownFilePath);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(`Error reading markdown file ${fullPath}:`, error);
    // Consider throwing an error or returning a specific marker for not found
    throw new Error(`Markdown file not found: ${markdownFilePath}`);
  }
}

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(allCategoriesData);
}

export async function getSubcommandsForCategory(categorySlug: string): Promise<Subcommand[]> {
  try {
    // Dynamically import the subcommands file for the given category
    // The import path must be relative to the `src` directory or use an alias
    const module = await import(`@/data/subcommands/${categorySlug}.ts`);
    if (module.subcommands && Array.isArray(module.subcommands)) {
      return module.subcommands;
    }
    console.warn(`No 'subcommands' array exported from '@/data/subcommands/${categorySlug}.ts'`);
    return [];
  } catch (error) {
    // This error could mean the file doesn't exist or there's an issue with the module itself
    console.error(`Error loading subcommands for category ${categorySlug}:`, error);
    return [];
  }
}

export async function getAllSubcommands(): Promise<Subcommand[]> {
  const allSubcommands: Subcommand[] = [];
  try {
    const categorySlugs = allCategoriesData.map(cat => cat.slug);
    for (const slug of categorySlugs) {
      try {
        const module = await import(`@/data/subcommands/${slug}.ts`);
        if (module.subcommands && Array.isArray(module.subcommands)) {
          allSubcommands.push(...module.subcommands);
        }
      } catch (importError) {
        console.warn(`Could not load subcommands for category ${slug}:`, importError);
      }
    }
  } catch (error) {
    console.error('Error retrieving all subcommands:', error);
  }
  return allSubcommands;
}

export async function getCommandDetail(commandSlug: string): Promise<CommandDetail | null> {
  const subcommands = await getAllSubcommands();
  const subcommand = subcommands.find(sc => sc.slug === commandSlug);

  if (!subcommand) {
    return null;
  }

  try {
    const markdownContent = await readMarkdownFile(subcommand.markdownPath);
    return {
      slug: subcommand.slug,
      categorySlug: subcommand.categorySlug,
      name: subcommand.name,
      shortDescription: subcommand.shortDescription,
      markdown: markdownContent,
    };
  } catch (error) {
    console.error(`Error fetching command detail for ${commandSlug}:`, error);
    return null; // Markdown file might be missing
  }
}
