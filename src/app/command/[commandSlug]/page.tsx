
import type { CommandDetail, Category } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, BookOpen } from 'lucide-react';
import IconRenderer from '@/components/common/IconRenderer';
import { getCommandDetail, getCategories } from '@/lib/file-system';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CommandPageProps {
  params: {
    commandSlug: string;
  };
}

export default async function CommandPage({ params }: CommandPageProps) {
  const { commandSlug } = params;

  const commandDetail = await getCommandDetail(commandSlug);

  if (!commandDetail) {
    notFound();
  }

  const categories = await getCategories();
  const categoryForIcon = categories.find(cat => cat.slug === commandDetail.categorySlug);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button variant="outline" className="mb-6" asChild>
        <Link href={`/category/${commandDetail.categorySlug}`}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to {categoryForIcon?.name || commandDetail.categorySlug}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {categoryForIcon && <IconRenderer iconSet={categoryForIcon.icon} className="w-8 h-8 text-primary" />}
            <CardTitle className="text-3xl font-bold font-headline text-primary">{commandDetail.name}</CardTitle>
          </div>
          <CardDescription className="text-md">
            Part of: <Link href={`/category/${commandDetail.categorySlug}`} className="text-accent hover:underline">{categoryForIcon?.name || commandDetail.categorySlug}</Link>
          </CardDescription>
          <CardDescription className="text-md">{commandDetail.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 p-4 bg-background rounded-lg shadow-inner">
            <div className="flex items-center text-lg font-semibold mb-3 text-foreground">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Command Cheatsheet
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold mt-8 mb-4 border-b pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-1" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-muted pl-4 italic my-3 text-muted-foreground" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 my-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li {...props} />,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '')
                  return !props.inline && match ? (
                    <pre className="bg-primary text-primary-foreground p-4 rounded-md overflow-x-auto my-4">
                      <code className={`language-${match[1]} font-mono text-sm`} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-muted text-primary px-1 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                },
                pre: ({node, ...props}) => <div {...props} />, 
                a: ({node, ...props}) => <a className="text-accent hover:underline" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
              }}
            >
              {commandDetail.markdown}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
      <footer className="text-center mt-12 py-6 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} MayR Labs. ShellBase is a product of MayR Labs.</p>
      </footer>
    </div>
  );
}
