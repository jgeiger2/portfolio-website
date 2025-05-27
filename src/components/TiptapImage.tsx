"use client";

import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

interface TiptapImageProps {
  node: {
    attrs: {
      src: string;
      alt?: string;
    };
  };
}

export default function TiptapImage({ node }: TiptapImageProps) {
  return (
    <NodeViewWrapper>
      <img
        src={node.attrs.src}
        alt={node.attrs.alt || ''}
        className="rounded-lg max-w-full h-auto"
      />
    </NodeViewWrapper>
  );
}
