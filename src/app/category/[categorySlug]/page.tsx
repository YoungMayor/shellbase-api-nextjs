
import type { Subcommand, Category } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Command, ExternalLink } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';
import { getCategories, getSubcommandsForCategory } from '@/lib/file-system';
import { notFound } from 'next/navigation';
import { PROJECT_NAME, PROJECT_AUTHOR, PROJECT_AUTHOR_LINK } from '@/config/constants';

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const allCategories = await getCategories();
  const category = allCategories.find(c => c.slug === params.categorySlug);
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  return {
    title: `${category.name} Commands`,
    description: `Browse ${category.name} commands on ${PROJECT_NAME}. ${category.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;

  let subcommands: Subcommand[] = [];
  let category: Category | null = null;
  let fetchError: string | null = null; 

  try {
    const allCategories = await getCategories();
    category = allCategories.find(c => c.slug === categorySlug) || null;

    if (!category) {
      notFound();
    }

    subcommands = await getSubcommandsForCategory(categorySlug);
  } catch (err) {
    console.error(`Error fetching data for category ${categorySlug}:`, err);
    fetchError = err instanceof Error ? err.message : 'An unknown server error occurred.';
  }

  if (fetchError) {
    return <div className="container mx-auto p-8 text-center text-destructive">{fetchError}</div>;
  }

  if (!category) {
    notFound(); // Should be caught above, but as a safeguard
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button variant="outline" className="mb-6 mt-6" asChild>
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to All Categories
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
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} <Link href={PROJECT_AUTHOR_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">{PROJECT_AUTHOR}</Link>. {PROJECT_NAME} is a product of {PROJECT_AUTHOR}.</p>
      </footer>
    </div>
  );
}

    