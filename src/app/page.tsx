
"use client";

import type { Category, SearchResult } from '@/types';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';
import { Button } from '@/components/ui/button';
import { 
  PROJECT_NAME, 
  PROJECT_AUTHOR, 
  PROJECT_AUTHOR_LINK,
  PROJECT_DESCRIPTION
} from '@/config/constants';


function PageContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  
  const searchParams = useSearchParams(); 

  useEffect(() => {
    async function fetchCategories() {
      setIsLoadingCategories(true);
      setError(null);
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching categories');
        console.error(err);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setCurrentSearchTerm('');
      return;
    }
    setIsSearching(true);
    setError(null);
    setCurrentSearchTerm(term);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term.trim())}`);
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during search');
      console.error(err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
      setCurrentSearchTerm('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  const getLinkForItem = (item: SearchResult): string => {
    if (item.type === 'category') {
      return `/category/${item.id}`;
    }
    return `/command/${item.id}`;
  };

  return (
      <div className="container mx-auto p-4 md:p-8">
        <section className="my-8 text-center">
          <h1 className="text-4xl font-bold mb-2 font-headline">{PROJECT_NAME}</h1>
          <p className="text-muted-foreground text-lg">
            {PROJECT_DESCRIPTION}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Browse commands or use the search bar above.
          </p>
        </section>

        {error && <p className="text-destructive text-center my-4">{error}</p>}

        {(isSearching || searchResults.length > 0 || currentSearchTerm) && (
          <section className="mb-12">
            {isSearching && <p className="text-center">Searching for "{currentSearchTerm}"...</p>}
            {!isSearching && searchResults.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-center font-headline">Search Results for "{currentSearchTerm}"</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((item) => (
                    <Link href={getLinkForItem(item)} key={`${item.type}-${item.id}`} passHref>
                      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            {item.icon && <IconRenderer iconSet={item.icon} className="w-6 h-6 text-primary" />}
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <CardDescription className="capitalize text-xs text-accent">{item.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.description || item.markdownPreview}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {!isSearching && currentSearchTerm && searchResults.length === 0 && (
              <p className="text-center text-muted-foreground mt-6">No results found for "{currentSearchTerm}".</p>
            )}
          </section>
        )}

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center font-headline">Command Categories</h2>
          {isLoadingCategories && <p className="text-center">Loading categories...</p>}
          {!isLoadingCategories && categories.length === 0 && !error && (
            <p className="text-center text-muted-foreground">No categories found.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug} passHref>
                <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col group">
                  <CardHeader className="items-center text-center">
                    <IconRenderer iconSet={category.icon} className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300 mb-2" />
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                  <div className="p-4 pt-0 text-center">
                      <Button variant="link" className="text-accent group-hover:underline">
                        View Commands <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <footer className="text-center mt-12 py-6 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <Link href={PROJECT_AUTHOR_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">{PROJECT_AUTHOR}</Link>. {PROJECT_NAME} is a product of {PROJECT_AUTHOR}. Built with Next.js.
          </p>
        </footer>
      </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageContent />
    </Suspense>
  );
}

    