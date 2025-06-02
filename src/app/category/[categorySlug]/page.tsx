"use client";

import type { Subcommand, Category } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Command, ExternalLink } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;

  const [subcommands, setSubcommands] = useState<Subcommand[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch category details (including icon)
        const catRes = await fetch('/api/categories');
        if (!catRes.ok) throw new Error('Failed to fetch categories');
        const allCategories: Category[] = await catRes.json();
        const currentCategory = allCategories.find(c => c.slug === categorySlug);
        if (!currentCategory) {
          throw new Error('Category not found');
        }
        setCategory(currentCategory);

        // Fetch subcommands
        const subRes = await fetch(`/api/categories/${categorySlug}`);
        if (!subRes.ok) throw new Error(`Failed to fetch subcommands for ${categorySlug}`);
        const subData = await subRes.json();
        setSubcommands(subData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [categorySlug]);

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-center text-destructive">{error}</div>;
  }

  if (!category) {
    return <div className="container mx-auto p-8 text-center">Category details not found.</div>;
  }


  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
      </Button>

      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <IconRenderer iconSet={category.icon} className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-primary font-headline">{category.name} Commands</h1>
        </div>
        <p className="text-muted-foreground">{category.description}</p>
      </header>

      {subcommands.length === 0 && (
        <p className="text-center text-muted-foreground">No subcommands found for this category.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcommands.map((subcommand) => (
          <Link href={`/command/${subcommand.slug}`} key={subcommand.slug} passHref>
             <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col group">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Command className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{subcommand.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{subcommand.shortDescription}</CardDescription>
              </CardContent>
              <div className="p-4 pt-0 text-right">
                <Button variant="link" size="sm" className="text-accent group-hover:underline">
                  View Details <ExternalLink className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
       <footer className="text-center mt-12 py-6 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Cheatography API</p>
      </footer>
    </div>
  );
}
