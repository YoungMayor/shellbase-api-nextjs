import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/file-system';
import type { Category } from '@/types';

export async function GET() {
  try {
    const categories: Category[] = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to get categories:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
