'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Container,
  Section,
  Badge
} from '@/components/ui';
import ProfileImage from '@/components/ProfileImage';

interface TypingEffectProps {
  text: string;
  speed?: number;
}

// Animation for typing effect
const TypingEffect = ({ text, speed = 100 }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      {index < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Real project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with product management, authentication, and Stripe payment processing.",
    image: "/images/projects/ecommerce-preview.jpg",
    technologies: ["Next.js", "React", "Stripe", "Firebase"],
    featured: true
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics and management platform for multiple social media accounts with real-time data visualization.",
    image: "/images/projects/dashboard-preview.jpg",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    featured: true
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Machine learning powered application for creating marketing content using GPT-4 integration.",
    image: "/images/projects/ai-preview.jpg",
    technologies: ["Python", "React", "TensorFlow", "OpenAI API"],
    featured: true
  }
];

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    description: "Learn how to build modern web applications with Next.js 14 and its new app router architecture.",
    date: "May 15, 2023",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building a Glassmorphic UI",
    description: "Create stunning glassmorphic UI elements using Tailwind CSS with this step-by-step tutorial.",
    date: "June 2, 2023",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Firebase Authentication with Next.js",
    description: "Implement secure user authentication in your Next.js application using Firebase Auth.",
    date: "June 10, 2023",
    readTime: "8 min read"
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Animation */}
      <Section className="min-h-[85vh] flex items-center bg-gradient-playful from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent-500 blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-tertiary-500 blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-primary-500 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            {/* Profile Image with Animation */}
            <div className="mb-8 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 rounded-full blur-sm animate-pulse-slow"></div>
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-background-dark shadow-xl">
                <ProfileImage />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-10 gradient-text animate-float text-center leading-loose pb-2">
              James Geiger
            </h1>
            <div className="text-xl md:text-3xl mb-8 h-12 text-center">
              <TypingEffect text="Full-stack developer crafting digital experiences" speed={80} />
            </div>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-center">
              Specializing in modern web applications with React, Next.js, and cloud technologies. 
              Building beautiful, responsive, and accessible interfaces with a focus on user experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="lg" asChild className="shadow-glow-primary">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-glow-tertiary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-glow-accent">
                <Link href="/resume">Resume</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Projects */}
      <Section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold mb-2 text-center gradient-text">Featured Projects</h2>
          <p className="text-center mb-10 text-gray-600 dark:text-gray-400">A selection of my recent work</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" 
                variant={index === 0 ? "playful" : index === 1 ? "gradient" : "accent"}
                highlight={index === 0}
              >
                <div className="relative h-48 overflow-hidden">
                  {/* This is a placeholder - in a real implementation, we'd have actual project images */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${
                    index === 0 
                      ? 'from-primary-500 to-accent-500' 
                      : index === 1 
                        ? 'from-secondary-500 to-tertiary-500'
                        : 'from-accent-500 to-tertiary-500'
                  }`}>
                  </div>
                  <div className="absolute bottom-0 left-0 p-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech} className="mr-1 mb-1" variant={
                        tech.includes('React') || tech.includes('Next') ? 'primary' : 
                        tech.includes('Node') ? 'secondary' :
                        tech.includes('Firebase') ? 'warning' :
                        'info'
                      }>{tech}</Badge>
                    ))}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle gradient={index === 1}>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{project.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className={`w-full shadow-glow-${index === 0 ? 'accent' : index === 1 ? 'tertiary' : 'primary'}`}
                  >
                    <Link href={`/projects/${project.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild className="shadow-glow-primary">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Blog Section */}
      <Section className="py-20 bg-gradient-to-b from-background-light to-secondary-50 dark:from-background-dark dark:to-secondary-950/30">
        <Container>
          <h2 className="text-3xl font-bold mb-2 text-center gradient-text-tertiary">Recent Blog Posts</h2>
          <p className="text-center mb-10 text-gray-600 dark:text-gray-400">Insights, tutorials, and tech updates</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="h-full glass-effect hover:shadow-lg transition-all duration-300 hover:-translate-y-1" variant="glass">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant={index === 0 ? "primary" : index === 1 ? "accent" : "tertiary"}>
                      {post.readTime}
                    </Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">{post.description}</p>
                  <Button variant="outline" size="sm" asChild className={`w-full shadow-glow-${index === 0 ? 'primary' : index === 1 ? 'accent' : 'tertiary'}`}>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild className="shadow-glow-tertiary">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-gradient-playful from-accent-100 via-background-light to-primary-100 dark:from-accent-950 dark:via-background-dark dark:to-primary-950">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8">
              Looking for a developer to bring your ideas to life? I'm currently available for freelance work and interesting opportunities.
            </p>
            <Button variant="outline" size="lg" asChild className="shadow-glow-primary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
