import React from 'react';
import EditBlogForm from '@/components/admin/EditBlogForm';

export default function Page({ params }: any) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogForm id={params.id} />
    </div>
  );
}