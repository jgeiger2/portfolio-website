import React from 'react';
import { 
  Container, 
  Section, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input
} from '@/components/ui';

export const metadata = {
  title: 'Contact | James Geiger',
  description: 'Get in touch with James Geiger for project inquiries, collaborations, or questions',
};

export default function ContactPage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-primary-100 to-background-light dark:from-primary-950 dark:to-background-dark">
        <Container>
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Interested in working together? Fill out the form below or reach out directly.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="mb-8">
                  Whether you're looking to discuss a project, ask a question, or just say hello, 
                  I'd love to hear from you. I typically respond within 24-48 hours.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-primary">hello@jamesgeiger.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p>San Francisco, California</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com/jamesgeiger" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        GitHub
                      </a>
                      <a 
                        href="https://linkedin.com/in/james-geiger" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://twitter.com/jamesgeiger" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="Your name" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="your.email@example.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          placeholder="What's this about?" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={6} 
                          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="Your message..." 
                          required
                        ></textarea>
                      </div>
                      
                      <Button type="submit" variant="primary">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
} 