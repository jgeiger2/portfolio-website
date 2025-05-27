import { notFound } from 'next/navigation';
import { Container, Section, Badge } from '@/components/ui';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import BlogContentImage from '@/components/BlogContentImage';
import HydrateImages from '@/components/HydrateImages';

// Add Blog type
export type Blog = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
  // Add any other fields as needed
};

// Generate metadata for the blog post page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const blogs: Blog[] = await fetchBlogs();
  const blog = blogs.find(blog => blog.id === params.id);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | James Geiger's Blog`,
    description: blog.body ? blog.body.replace(/<[^>]*>/g, '').substring(0, 160) : '',
  };
}

// Page configuration for Next.js 15
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
export const revalidate = 0;
export const fetchCache = 'auto';
import { Suspense } from 'react';
import BlogPostContent from '@/components/BlogPostContent';

// This type helps TypeScript understand the shape of the page's props
export interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostContent id={params.id} />
      </Suspense>
    </div>
  );
  try {
    const blogs: Blog[] = use(fetchBlogs());
    
    // Debug logs
    console.log("Looking for blog with ID:", id);
    console.log("All blog IDs:", blogs.map(blog => blog.id));
    
    const blog = blogs.find(blog => blog.id === params.id);
    
    // If blog not found, show 404
    if (!blog) {
      console.log("Blog not found for ID:", params.id);
      notFound();
    }

    // Format date
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Estimate reading time
    const estimateReadTime = (body: string) => {
      if (!body) return '1 min read';
      // Average reading speed: 200 words per minute
      const wordCount = body.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      return `${readTimeMinutes} min read`;
    };

    return (
      <>
        <Section className="bg-gradient-to-b from-primary-100 to-background-light dark:from-primary-950 dark:to-background-dark pt-12 pb-8">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
                {blog.subtitle && (
                  <p className="text-xl md:text-2xl text-muted-foreground mb-4">{blog.subtitle}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(blog.datePublished)}</span>
                  <span>•</span>
                  <span>{estimateReadTime(blog.body)}</span>
                  {blog.category && (
                    <>
                      <span>•</span>
                      <Badge variant="secondary">{blog.category}</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <article className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-semibold prose-img:rounded-lg">
              <HydrateImages />
              {/* Render the HTML content safely with image optimization disabled */}
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: blog.body ? blog.body.replace(
                    /<img([^>]*)src="([^"]*)"([^>]*)>/gi, 
                    (match, before, src, after) => {
                      // Extract alt and title if they exist
                      const altMatch = before.match(/alt="([^"]*)"/);
                      const titleMatch = before.match(/title="([^"]*)"/);
                      const alt = altMatch ? altMatch[1] : '';
                      const title = titleMatch ? titleMatch[1] : '';
                      
                      // Create a custom element that will be hydrated with our BlogContentImage component
                      return `<blog-content-image 
                        data-src="${src}" 
                        data-alt="${alt}" 
                        data-title="${title}"
                        class="my-4"
                      ></blog-content-image>`;
                    }
                  ) : '' 
                }} 
              />
            </article>
          </Container>
        </Section>
      </>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
} 