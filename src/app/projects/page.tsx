"use client";
import React, { useEffect, useState } from 'react';
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
import { fetchProjects } from '@/lib/firebase/firebaseUtils';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

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
          {loading ? (
            <div className="text-center text-lg">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`h-full flex flex-col ${cardHoverEffects}`}
                >
                  <div className="h-48 bg-primary-100 dark:bg-primary-900 rounded-t-lg flex items-center justify-center">
                    {/* Image placeholder or actual image */}
                    {project.images && project.images.length > 0 ? (
                      <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover rounded-t-lg" />
                    ) : (
                      <div className="text-primary">Image Placeholder</div>
                    )}
                  </div>
                  <CardHeader className="pb-3 bg-gradient-to-r from-background-light to-primary-50 dark:from-background-dark dark:to-primary-950/30">
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-4">{project.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {(project.technologies || project.tech || []).map((tech: string) => (
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
          )}
        </Container>
      </Section>
    </>
  );
} 