import React from 'react';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import Link from 'next/link';
import BlogImage from '@/components/BlogImage';
import { 
  Container, 
  Section, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge,
} from '@/components/ui';

export const metadata = {
  title: 'Blog | James Geiger',
  description: 'Technical articles and tutorials on web development and software engineering',
};

// Demo images for testing - only use if no featured image is available
const demoImages = {
  'The Weight of Time and Dreams': '/images/placeholder/blog-placeholder-1.jpg',
  '2023: A Year of Transformation and Triumph': '/images/placeholder/blog-placeholder-2.jpg',
  'Beyond Limits: NDEAM 2023 and My 11-Year Journey': '/images/placeholder/blog-placeholder-3.jpg'
};

// Add Blog type
export type Blog = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
  featuredImage?: string;
  categories?: string[];
  importedFromMedium?: boolean;
};

export default async function BlogPage() {
  // Fetch real blog posts from Firestore
  const blogs: Blog[] = await fetchBlogs();

  // Log blogs to debug
  console.log("Blog posts found:", blogs.length);
  console.log("First blog post ID:", blogs[0]?.id);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to estimate reading time based on body content
  const estimateReadTime = (body: string) => {
    if (!body) return '1 min read';
    // Average reading speed: 200 words per minute
    const wordCount = body.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${readTimeMinutes} min read`;
  };

  // Function to check if an image URL is valid
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    return url.startsWith('http');
  };

  // Generate initials for fallback display
  const getInitials = (title: string) => {
    if (!title) return 'JG';
    const words = title.split(' ');
    if (words.length === 1) return title.substring(0, 2).toUpperCase();
    return (words[0][0] + (words.length > 1 ? words[1][0] : '')).toUpperCase();
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-100 via-background-light to-secondary-100 dark:from-primary-900/50 dark:via-background-dark dark:to-secondary-900/50 overflow-hidden relative">
        <Container>
          <div className="text-center mb-6 relative z-10 py-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 gradient-text animate-float">Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Technical articles and tutorials on web development, software engineering, and design.
            </p>
            <div className="mt-4">
              <Link href="/blog/debug" className="text-sm text-primary-500 hover:underline">
                Debug blog posts
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 relative overflow-hidden bg-gradient-to-b from-background-light to-background-light dark:from-background-dark dark:to-background-dark">
        <Container className="relative z-10">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4 gradient-text">No blog posts yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => {
                // Get image URL with priority to featured image from database
                let imageUrl = post.featuredImage;
                
                // Always use local placeholders instead of Medium images for reliability
                if (demoImages[post.title]) {
                  imageUrl = demoImages[post.title];
                } else {
                  // Default fallback if no match in demoImages
                  imageUrl = '/images/placeholder/blog-placeholder-1.jpg';
                }
                
                // Commented out Medium image URL formatting until we resolve the issues
                /*if (post.importedFromMedium && imageUrl && imageUrl.includes('miro.medium.com') && !imageUrl.includes('resize:fit:1400')) {
                  // Extract the image ID from the URL if possible
                  const match = imageUrl.match(/\/([^\/]+)$/);
                  if (match && match[1]) {
                    // Construct the high-quality preview URL format
                    imageUrl = `https://miro.medium.com/v2/resize:fit:1400/format:webp/${match[1]}`;
                  }
                }*/
                
                return (
                  <Link 
                    href={`/blog/${post.id}`}
                    key={post.id} 
                    className="block"
                  >
                    <Card 
                      className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                    >
                      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 group-hover:scale-[1.02] transition-transform duration-500">
                        {imageUrl && isValidImageUrl(imageUrl) ? (
                          <BlogImage
                            src={imageUrl}
                            alt={post.title}
                            title={post.title}
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            <span className="text-3xl font-semibold text-primary-700 dark:text-primary-300">
                              {getInitials(post.title)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardHeader className="pt-6">
                        <div className="flex flex-col mb-2">
                          <CardTitle className={`mb-2 line-clamp-2 transition-colors duration-300 ${index % 3 === 0 ? 'group-hover:text-primary-500' : index % 3 === 1 ? 'group-hover:text-secondary-500' : 'group-hover:text-accent-500'}`}>
                            {post.title}
                          </CardTitle>
                          {post.subtitle && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{post.subtitle}</p>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {formatDate(post.datePublished)} • {estimateReadTime(post.body)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4 mt-2">
                          {post.categories && post.categories.length > 0 ? (
                            post.categories.map((category, idx) => (
                              <Badge key={idx} variant="secondary" className="transition-transform duration-300 group-hover:scale-105">
                                {category}
                              </Badge>
                            ))
                          ) : post.category ? (
                            <Badge variant="secondary" className="transition-transform duration-300 group-hover:scale-105">
                              {post.category}
                            </Badge>
                          ) : null}
                        </div>
                        <span className={`mt-auto text-sm font-medium hover:underline transition-colors duration-300 ${index % 3 === 0 ? 'text-primary-500' : index % 3 === 1 ? 'text-secondary-500' : 'text-accent-500'}`}>
                          Read More
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
} 