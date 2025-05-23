import { notFound } from 'next/navigation';
import { Container, Section, Badge } from '@/components/ui';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';

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

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  try {
    const blogs: Blog[] = await fetchBlogs();
    
    // Debug logs
    console.log("Looking for blog with ID:", params.id);
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
              {/* Render the HTML content safely with image optimization disabled */}
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: blog.body ? blog.body.replace(
                    /<img([^>]*)src="([^"]*)"([^>]*)>/gi, 
                    '<img$1src="$2"$3 loading="lazy" decoding="async">'
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