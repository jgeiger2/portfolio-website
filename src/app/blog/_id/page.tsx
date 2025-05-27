import { Suspense } from 'react';
import BlogPostContent from '@/components/BlogPostContent';

// Page configuration for Next.js 15
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
export const revalidate = 0;
export const fetchCache = 'auto';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostContent id={params.id} />
      </Suspense>
    </div>
  );
} 