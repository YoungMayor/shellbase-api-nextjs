import { NextResponse } from 'next/server';
import { getSubcommandsForCategory, getCategories } from '@/lib/file-system';
import type { Subcommand } from '@/types';

interface Params {
  categorySlug: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { categorySlug } = params;

  try {
    // Optional: Validate if categorySlug exists
    const allCategories = await getCategories();
    if (!allCategories.find(cat => cat.slug === categorySlug)) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const subcommands: Subcommand[] = await getSubcommandsForCategory(categorySlug);
    if (subcommands.length === 0) {
      // This could mean the category is valid but has no subcommands defined yet,
      // or the subcommands file is empty/missing.
      // Depending on desired behavior, could return 404 or empty array.
      // For now, returning empty array if file loaded but was empty.
      // If getSubcommandsForCategory threw an error (file not found), it would be caught below.
    }
    return NextResponse.json(subcommands);
  } catch (error) {
    console.error(`Failed to get subcommands for category ${categorySlug}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
