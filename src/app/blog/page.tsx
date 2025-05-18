import React from 'react';
import Link from 'next/link';
import { 
  Container, 
  Section, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button,
  Badge
} from '@/components/ui';

export const metadata = {
  title: 'Blog | James Geiger',
  description: 'Technical articles and tutorials on web development and software engineering',
};

export default function BlogPage() {
  // Mock blog posts data - in a real app, this would come from a database
  const posts = [
    {
      id: 1,
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and its new app router architecture.',
      date: 'May 15, 2023',
      readTime: '8 min read',
      categories: ['Next.js', 'React', 'Tutorial'],
    },
    {
      id: 2,
      title: 'Building a Glassmorphic UI with Tailwind CSS',
      excerpt: 'Create stunning glassmorphic UI elements using Tailwind CSS with this step-by-step tutorial.',
      date: 'April 22, 2023',
      readTime: '6 min read',
      categories: ['CSS', 'Tailwind', 'UI Design'],
    },
    {
      id: 3,
      title: 'Authentication Patterns in Modern Web Applications',
      excerpt: 'Explore different authentication strategies and learn how to implement them in your web applications.',
      date: 'March 18, 2023',
      readTime: '10 min read',
      categories: ['Security', 'Authentication', 'Web Development'],
    },
    {
      id: 4,
      title: 'State Management with React Context vs Redux',
      excerpt: 'Compare React Context API with Redux for state management and learn when to use each approach.',
      date: 'February 28, 2023',
      readTime: '9 min read',
      categories: ['React', 'State Management', 'Redux'],
    },
    {
      id: 5,
      title: 'Building a Serverless API with Firebase Functions',
      excerpt: 'Learn how to create scalable serverless APIs using Firebase Cloud Functions and Firestore.',
      date: 'January 15, 2023',
      readTime: '7 min read',
      categories: ['Firebase', 'Serverless', 'API Development'],
    },
  ];

  return (
    <>
      <Section className="bg-gradient-to-b from-primary-100 to-background-light dark:from-primary-950 dark:to-background-dark">
        <Container>
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Technical articles and tutorials on web development, software engineering, and design.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="mb-8">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <CardTitle className="mb-2 md:mb-0">{post.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {post.date} • {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
} 