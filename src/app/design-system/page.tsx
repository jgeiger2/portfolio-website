import React from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  Input,
  Container,
  Badge
} from '@/components/ui';

export default function DesignSystemPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">Design System</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Glass Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="sm">Small Button</Button>
            <Button variant="default">Medium Button</Button>
            <Button variant="default" size="lg">Large Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Loading Button</Button>
            <Button variant="default" disabled>Disabled Button</Button>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a card with glass morphism styling.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Solid Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a card with solid styling.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            placeholder="Enter some text" 
          />
          
          <Input 
            placeholder="Enter some text" 
          />
          
          <Input 
            placeholder="Enter some text"
            error="This field is required"
          />
          
          <Input 
            placeholder="Search..." 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            }
          />
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="glass">Glass</Badge>
        </div>
      </section>
    </Container>
  );
} 