import React from 'react';
import Link from 'next/link';
import { 
  Container, 
  Section, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button 
} from '@/components/ui';
import { backgroundPatterns, cardHoverEffects } from '@/lib/stylePatterns';

export const metadata = {
  title: 'Projects | James Geiger',
  description: 'Explore my portfolio of web development projects',
};

export default function ProjectsPage() {
  // Mock projects data - in a real app, this would come from a database
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with Next.js, Firebase, and Stripe payment integration.',
      technologies: ['Next.js', 'Firebase', 'Stripe', 'Tailwind CSS'],
      image: '/images/placeholder.jpg',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity application for managing tasks and projects with real-time collaboration features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      image: '/images/placeholder.jpg',
    },
    {
      id: 3,
      title: 'Fitness Tracking Dashboard',
      description: 'A health and fitness tracking application with data visualization and progress tracking.',
      technologies: ['React', 'Chart.js', 'Express', 'PostgreSQL'],
      image: '/images/placeholder.jpg',
    },
    {
      id: 4,
      title: 'Real Estate Listing Platform',
      description: 'A property listing website with advanced search filters and map integration.',
      technologies: ['Next.js', 'Google Maps API', 'Prisma', 'MySQL'],
      image: '/images/placeholder.jpg',
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A dashboard for managing multiple social media accounts and analyzing engagement metrics.',
      technologies: ['Vue.js', 'Express', 'Social Media APIs', 'D3.js'],
      image: '/images/placeholder.jpg',
    },
    {
      id: 6,
      title: 'Weather Application',
      description: 'A weather forecasting application with location-based services and weather alerts.',
      technologies: ['React Native', 'Weather API', 'Geolocation', 'Push Notifications'],
      image: '/images/placeholder.jpg',
    },
  ];

  return (
    <>
      <Section className={backgroundPatterns.primary}>
        <Container>
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">My Projects</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore my portfolio of web and mobile applications built with modern technologies.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className={`h-full flex flex-col ${cardHoverEffects}`}
              >
                <div className="h-48 bg-primary-100 dark:bg-primary-900 rounded-t-lg flex items-center justify-center">
                  {/* Image placeholder - would use Next.js Image component in production */}
                  <div className="text-primary">Image Placeholder</div>
                </div>
                <CardHeader className="pb-3 bg-gradient-to-r from-background-light to-primary-50 dark:from-background-dark dark:to-primary-950/30">
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">{project.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="inline-block px-2 py-1 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className={`shadow-glow-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'accent' : 'tertiary'}`}
                  >
                    <Link href={`/projects/${project.id}`}>View Details</Link>
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