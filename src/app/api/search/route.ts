import { NextResponse } from 'next/server';
import { getCategories, getAllSubcommands, getCommandDetail } from '@/lib/file-system';
import type { SearchResult, Category, Subcommand, CommandDetail } from '@/types';

function simpleMarkdownPreview(markdown: string, maxLength: number = 150): string {
  // Remove markdown syntax for a cleaner preview
  let preview = markdown
    .replace(/#{1,6}\s+(.*)/g, '$1') // Headers
    .replace(/[*_`~]/g, '') // Emphasis, code ticks, strikethrough
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/\n+/g, ' ') // Newlines to spaces
    .trim();
  
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength) + '...';
  }
  return preview;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
  }

  const results: SearchResult[] = [];

  try {
    const categories = await getCategories();
    const subcommands = await getAllSubcommands();
    
    // Search categories
    categories.forEach(category => {
      if (category.name.toLowerCase().includes(query) || 
          category.description.toLowerCase().includes(query) ||
          category.slug.toLowerCase().includes(query)) {
        results.push({
          type: 'category',
          id: category.slug,
          title: category.name,
          description: category.description,
          icon: category.icon,
        });
      }
    });

    // Search subcommands (and their markdown content)
    for (const subcommand of subcommands) {
      let matchedInSubcommand = false;
      if (subcommand.name.toLowerCase().includes(query) ||
          subcommand.shortDescription.toLowerCase().includes(query) ||
          subcommand.slug.toLowerCase().includes(query)) {
        results.push({
          type: 'subcommand',
          id: subcommand.slug,
          title: `${subcommand.categorySlug} ${subcommand.name}`,
          description: subcommand.shortDescription,
          category: subcommand.categorySlug,
        });
        matchedInSubcommand = true;
      }

      // Search markdown content if not already matched by subcommand fields or for more relevance
      const commandDetail = await getCommandDetail(subcommand.slug);
      if (commandDetail && commandDetail.markdown.toLowerCase().includes(query)) {
        // Avoid duplicate if already matched by name/desc, unless we want to boost by markdown match
        const existingResult = results.find(r => r.type === 'subcommand' && r.id === subcommand.slug);
        if (!existingResult) {
             results.push({
                type: 'command', // or 'subcommand' with markdown context
                id: subcommand.slug,
                title: `${commandDetail.categorySlug} ${commandDetail.name}`,
                description: subcommand.shortDescription, // or markdown preview
                category: commandDetail.categorySlug,
                markdownPreview: simpleMarkdownPreview(commandDetail.markdown),
            });
        } else if (existingResult.type === 'subcommand') { // Upgrade to command type or add preview
            existingResult.type = 'command';
            existingResult.markdownPreview = simpleMarkdownPreview(commandDetail.markdown);
        }
      }
    }
    
    // Deduplicate results (simple approach by ID)
    const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());

    return NextResponse.json(uniqueResults);

  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ message: 'Internal Server Error during search' }, { status: 500 });
  }
}
