import { NextResponse } from 'next/server';
import { getCommandDetail } from '@/lib/file-system';
import type { CommandDetail } from '@/types';

interface Params {
  commandSlug: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { commandSlug } = params;

  try {
    const commandDetail: CommandDetail | null = await getCommandDetail(commandSlug);

    if (!commandDetail) {
      return NextResponse.json({ message: 'Command not found' }, { status: 404 });
    }

    return NextResponse.json(commandDetail);
  } catch (error) {
    console.error(`Failed to get command detail for ${commandSlug}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
