
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import Link from 'next/link';
import { ChevronLeft, Terminal } from 'lucide-react';

interface ApiParam {
  name: string;
  in: 'path' | 'query';
  description: string;
  required: boolean;
  type: 'string' | 'integer'; // Simplified type
}

interface ApiEndpoint {
  id: string;
  method: 'GET'; // Currently only GET is supported by existing APIs
  path: string; // e.g., /api/categories/{categorySlug}
  pathTemplate: string; // e.g., /api/categories/:categorySlug - for display
  summary: string;
  parameters: ApiParam[];
}

interface ApiResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'get-categories',
    method: 'GET',
    path: '/api/categories',
    pathTemplate: '/api/categories',
    summary: 'Retrieves a list of all command categories.',
    parameters: [],
  },
  {
    id: 'get-category-subcommands',
    method: 'GET',
    path: '/api/categories/{categorySlug}',
    pathTemplate: '/api/categories/:categorySlug',
    summary: 'Retrieves subcommands for a specific category.',
    parameters: [
      { name: 'categorySlug', in: 'path', description: 'Slug of the category (e.g., git, bash).', required: true, type: 'string' },
    ],
  },
  {
    id: 'get-command-detail',
    method: 'GET',
    path: '/api/commands/{commandSlug}',
    pathTemplate: '/api/commands/:commandSlug',
    summary: 'Retrieves detailed information for a specific command.',
    parameters: [
      { name: 'commandSlug', in: 'path', description: 'Slug of the command (e.g., git-commit, bash-ls).', required: true, type: 'string' },
    ],
  },
  {
    id: 'search-commands',
    method: 'GET',
    path: '/api/search', // Query param will be appended
    pathTemplate: '/api/search?q=:query',
    summary: 'Searches for categories and commands based on a query string.',
    parameters: [
      { name: 'q', in: 'query', description: 'The search term.', required: true, type: 'string' },
    ],
  },
];


export default function ApiDocsPage() {
  const [paramValues, setParamValues] = useState<Record<string, Record<string, string>>>({});
  const [apiResponses, setApiResponses] = useState<Record<string, ApiResponse | null>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, string | null>>({});
  const [availableCategorySlugs, setAvailableCategorySlugs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch category slugs to provide examples
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setAvailableCategorySlugs(data.map((cat: any) => cat.slug));
        }
      } catch (e) {
        console.error("Failed to fetch category slugs for API docs", e);
      }
    }
    fetchCategories();
  }, []);
  
  const handleParamChange = (endpointId: string, paramName: string, value: string) => {
    setParamValues(prev => ({
      ...prev,
      [endpointId]: {
        ...(prev[endpointId] || {}),
        [paramName]: value,
      },
    }));
  };

  const makeApiCall = async (endpoint: ApiEndpoint) => {
    setLoadingStates(prev => ({ ...prev, [endpoint.id]: true }));
    setApiResponses(prev => ({ ...prev, [endpoint.id]: null }));
    setErrorStates(prev => ({ ...prev, [endpoint.id]: null }));

    let urlPath = endpoint.path;
    const queryParams = new URLSearchParams();
    const currentEndpointParams = paramValues[endpoint.id] || {};

    for (const param of endpoint.parameters) {
      const value = currentEndpointParams[param.name];
      if (param.required && !value) {
        setErrorStates(prev => ({ ...prev, [endpoint.id]: `Parameter "${param.name}" is required.` }));
        setLoadingStates(prev => ({ ...prev, [endpoint.id]: false }));
        return;
      }
      if (value) {
        if (param.in === 'path') {
          urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(value));
        } else if (param.in === 'query') {
          queryParams.set(param.name, value);
        }
      }
    }
    
    const finalUrl = queryParams.toString() ? `${urlPath}?${queryParams.toString()}` : urlPath;

    try {
      const res = await fetch(finalUrl, { method: endpoint.method });
      const responseBody = await res.json().catch(() => res.text()); // Try JSON, fallback to text
      
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setApiResponses(prev => ({
        ...prev,
        [endpoint.id]: {
          status: res.status,
          headers: responseHeaders,
          body: responseBody,
        },
      }));
    } catch (err) {
      setErrorStates(prev => ({ ...prev, [endpoint.id]: err instanceof Error ? err.message : 'An unknown error occurred' }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [endpoint.id]: false }));
    }
  };

  const getPlaceholderForParam = (paramName: string) => {
    if (paramName === 'categorySlug' && availableCategorySlugs.length > 0) {
      return `e.g., ${availableCategorySlugs.join(', ')}`;
    }
    if (paramName === 'commandSlug') {
      return `e.g., git-commit, bash-ls`;
    }
    if (paramName === 'q') {
      return `e.g., list files, docker run`;
    }
    return '';
  };


  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="mb-8 relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <div className="flex items-center mb-4">
           <Button variant="outline" size="sm" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">API Documentation & Tester</h1>
        </div>
        <p className="text-muted-foreground">
          Explore and test the ShellBase API endpoints.
        </p>
      </header>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {apiEndpoints.map((endpoint) => (
          <AccordionItem value={endpoint.id} key={endpoint.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 w-full">
                <span 
                  className={`text-sm font-semibold px-2.5 py-0.5 rounded-md
                    ${endpoint.method === 'GET' ? 'bg-sky-500 text-white' : ''} 
                    // Add more colors for other methods
                  `}
                >
                  {endpoint.method}
                </span>
                <span className="text-sm md:text-base font-mono text-left flex-grow">{endpoint.pathTemplate}</span>
                <span className="text-sm text-muted-foreground hidden md:block mr-2">{endpoint.summary}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-none shadow-none">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-6 md:hidden">{endpoint.summary}</p>
                  
                  {endpoint.parameters.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-foreground">Parameters</h4>
                      <div className="space-y-3">
                        {endpoint.parameters.map((param) => (
                          <div key={param.name} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                            <Label htmlFor={`${endpoint.id}-${param.name}`} className="md:text-right md:pr-2">
                              {param.name}
                              {param.required && <span className="text-destructive">*</span>}
                              <span className="text-xs text-muted-foreground ml-1">({param.in})</span>
                            </Label>
                            <Input
                              id={`${endpoint.id}-${param.name}`}
                              type={param.type === 'integer' ? 'number' : 'text'}
                              value={paramValues[endpoint.id]?.[param.name] || ''}
                              onChange={(e) => handleParamChange(endpoint.id, param.name, e.target.value)}
                              placeholder={getPlaceholderForParam(param.name) || param.description}
                              className="col-span-1 md:col-span-3"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button onClick={() => makeApiCall(endpoint)} disabled={loadingStates[endpoint.id]} className="mb-4">
                    <Terminal className="mr-2 h-4 w-4" />
                    {loadingStates[endpoint.id] ? 'Executing...' : 'Execute'}
                  </Button>

                  {errorStates[endpoint.id] && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
                      Error: {errorStates[endpoint.id]}
                    </div>
                  )}

                  {apiResponses[endpoint.id] && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Response</h4>
                      <div>
                        <Label className="text-xs text-muted-foreground">Status Code</Label>
                        <p className={`font-mono p-2 rounded-md text-sm ${
                            apiResponses[endpoint.id]!.status >= 200 && apiResponses[endpoint.id]!.status < 300 
                              ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                              : 'bg-red-500/10 text-red-700 dark:text-red-400'
                          }`}>
                          {apiResponses[endpoint.id]!.status}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground">Headers</Label>
                        <ScrollArea className="h-32 rounded-md border">
                           <pre className="p-3 text-xs font-mono bg-muted/50">
                            {JSON.stringify(apiResponses[endpoint.id]!.headers, null, 2)}
                          </pre>
                        </ScrollArea>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Body</Label>
                        <ScrollArea className="h-64 rounded-md border">
                          <pre className="p-3 text-xs font-mono bg-muted/50">
                            {typeof apiResponses[endpoint.id]!.body === 'string'
                              ? apiResponses[endpoint.id]!.body
                              : JSON.stringify(apiResponses[endpoint.id]!.body, null, 2)}
                          </pre>
                        </ScrollArea>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <footer className="text-center mt-12 py-6 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} MayR Labs. ShellBase is a product of MayR Labs.</p>
      </footer>
    </div>
  );
}
