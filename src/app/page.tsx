"use client";

import type { Category, SearchResult } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ExternalLink } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';
import { ThemeToggle } from '@/components/common/ThemeToggle';


export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const getLinkForItem = (item: SearchResult): string => {
    if (item.type === 'category') {
      return `/category/${item.id}`;
    }
    return `/command/${item.id}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="mb-8 text-center relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-primary font-headline pt-4">ShellBase</h1>
        <p className="text-muted-foreground">Browse and test your CLI cheatsheet data.</p>
      </header>

      <section className="mb-12">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-6">
          <Input
            type="search"
            placeholder="Search commands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" /> {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>

        {error && <p className="text-destructive text-center my-4">{error}</p>}

        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center font-headline">Search Results</h2>
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
         {searchTerm && !isSearching && searchResults.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">No results found for "{searchTerm}".</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center font-headline">Command Categories</h2>
        {isLoading && <p className="text-center">Loading categories...</p>}
        {!isLoading && categories.length === 0 && !error && (
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
          &copy; {new Date().getFullYear()} ShellBase. Built with Next.js.
          <span className="mx-1">|</span> 
          <Link href="/api-docs" className="text-accent hover:underline">API Docs</Link>
        </p>
      </footer>
    </div>
  );
}
