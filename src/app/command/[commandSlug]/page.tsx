"use client";

import type { CommandDetail } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, BookOpen } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer'; // For category icon
import { categories as allCategoriesData } from '@/data/categories-data'; // To get category icon

// Basic Markdown to HTML converter (very simplified)
// For a real app, use a library like 'marked' or 'react-markdown'
function BasicMarkdownToHtml({ markdown }: { markdown: string }) {
  const html = markdown
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-1">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-8 mb-4 border-b pb-2">$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 pl-4 italic my-2">$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono text-accent-foreground">$1</code>')
    .replace(/```bash\n([\s\S]*?)```/gim, '<pre class="bg-secondary p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm">$1</code></pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre class="bg-secondary p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm">$1</code></pre>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n/g, '<br />') // Basic newline handling
    // Handle lists properly (this is a crude approximation)
    .replace(/(<li.*<\/li>)(?![\s\S]*<li)/gim, '<ul>$1</ul>')
    .replace(/<\/ul><br \/><ul>/gim, '');


  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}


export default function CommandPage() {
  const params = useParams();
  const router = useRouter();
  const commandSlug = params.commandSlug as string;

  const [commandDetail, setCommandDetail] = useState<CommandDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!commandSlug) return;

    async function fetchCommandDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/commands/${commandSlug}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Command not found');
          throw new Error(`Failed to fetch command: ${commandSlug}`);
        }
        const data = await res.json();
        setCommandDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommandDetail();
  }, [commandSlug]);

  const category = commandDetail ? allCategoriesData.find(cat => cat.slug === commandDetail.categorySlug) : null;

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading command details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-center text-destructive">{error}</div>;
  }

  if (!commandDetail) {
    return <div className="container mx-auto p-8 text-center">Command details not available.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {category && <IconRenderer iconSet={category.icon} className="w-8 h-8 text-primary" />}
            <CardTitle className="text-3xl font-bold font-headline text-primary">{commandDetail.name}</CardTitle>
          </div>
          <CardDescription className="text-md">
            Part of: <Link href={`/category/${commandDetail.categorySlug}`} className="text-accent hover:underline">{category?.name || commandDetail.categorySlug}</Link>
          </CardDescription>
          <CardDescription className="text-md">{commandDetail.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 p-4 bg-background rounded-lg shadow-inner">
            <div className="flex items-center text-lg font-semibold mb-3 text-foreground">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Command Cheatsheet
            </div>
            <BasicMarkdownToHtml markdown={commandDetail.markdown} />
          </div>
        </CardContent>
      </Card>
      <footer className="text-center mt-12 py-6 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Cheatography API</p>
      </footer>
    </div>
  );
}
