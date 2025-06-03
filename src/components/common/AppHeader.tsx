
"use client";

import type { FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Github, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { 
  PROJECT_NAME,
  PROJECT_GITHUB_LINK,
  API_DOCS_URL
} from '@/config/constants';

export default function AppHeader() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/'); 
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="pl-2 mr-6 flex items-center space-x-2">
            <Image src="/icon.png" alt={`${PROJECT_NAME} Icon`} width={32} height={32} className="h-8 w-8" priority />
            <Image src="/wordmark.png" alt={`${PROJECT_NAME} Wordmark`} width={128} height={32} className="h-8 hidden sm:inline-block" />
          </Link>
        </div>

        <div className="md:hidden flex-1">
           <Link href="/" className="pl-2 flex items-center space-x-2">
            <Image src="/icon.png" alt={`${PROJECT_NAME} Icon`} width={28} height={28} className="h-7 w-7" priority />
            <Image src="/wordmark.png" alt={`${PROJECT_NAME} Wordmark`} width={112} height={28} className="h-7" />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
            <Button type="submit" variant="outline" size="sm" className="h-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href={API_DOCS_URL}>
                <FileText className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">API Docs</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={PROJECT_GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <div className="md:hidden p-2 border-t">
          <form onSubmit={handleSearchSubmit} className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 flex-grow"
            />
            <Button type="submit" variant="outline" size="sm" className="h-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
    </header>
  );
}
