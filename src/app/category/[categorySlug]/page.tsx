
import type { Subcommand, Category } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Command, ExternalLink } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';
import { getCategories, getSubcommandsForCategory } from '@/lib/file-system';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;

  let subcommands: Subcommand[] = [];
  let category: Category | null = null;
  let fetchError: string | null = null; // For errors not handled by notFound

  try {
    const allCategories = await getCategories();
    category = allCategories.find(c => c.slug === categorySlug) || null;

    if (!category) {
      notFound();
    }

    subcommands = await getSubcommandsForCategory(categorySlug);
  } catch (err) {
    console.error(`Error fetching data for category ${categorySlug}:`, err);
    // Most "not found" scenarios are handled by the explicit notFound() call.
    // This catch is for other unexpected errors during data fetching.
    fetchError = err instanceof Error ? err.message : 'An unknown server error occurred.';
  }

  if (fetchError) {
    return <div className="container mx-auto p-8 text-center text-destructive">{fetchError}</div>;
  }

  // Category should be guaranteed to be non-null here due to the notFound() call,
  // but as a fallback or if logic changes:
  if (!category) {
    // This path should ideally not be reached if notFound() works as expected.
    return <div className="container mx-auto p-8 text-center">Category details not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <Button variant="outline" className="mb-6" asChild>
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
        </Link>
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
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ShellBase API</p>
      </footer>
    </div>
  );
}
