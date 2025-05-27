'use client';

'use client';

import React, { forwardRef, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import styles from './TiptapEditor.module.css';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

const TiptapEditor = forwardRef<Editor, TiptapEditorProps>(({
  content,
  onChange,
  placeholder = 'Start typing...',
  className = '',
  onImageUpload,
}, ref) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.ProseMirror
      }
    },
    immediatelyRender: false, // Fix SSR hydration issues
    onCreate: ({ editor }) => {
      // Ensure editor is properly initialized
      editor.commands.focus('end');
    },
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
          loading: 'lazy',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Highlight,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (ref && editor) {
      if (typeof ref === 'function') {
        ref(editor);
      } else {
        ref.current = editor;
      }
    }
  }, [ref, editor]);

  if (!editor) {
    return null;
  }

  const addImage = async () => {
    if (!onImageUpload) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (!input.files?.length) return;
      
      try {
        const url = await onImageUpload(input.files[0]);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    input.click();
  };

  return (
      <div className={`${styles['tiptap-editor']} ${className}`}>
        <div className={styles.toolbar}>
          <button
            type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          className={`${styles.button} ${editor.isActive('heading', { level: 1 }) ? styles['is-active'] : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          className={`${styles.button} ${editor.isActive('heading', { level: 2 }) ? styles['is-active'] : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          className={`${styles.button} ${editor.isActive('heading', { level: 3 }) ? styles['is-active'] : ''}`}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={styles.button}
          title="Normal text"
        >
          ¶
        </button>
        <div className={styles.divider} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${styles.button} ${editor.isActive('bold') ? styles['is-active'] : ''}`}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${styles.button} ${editor.isActive('italic') ? styles['is-active'] : ''}`}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${styles.button} ${editor.isActive('strike') ? styles['is-active'] : ''}`}
          title="Strike"
        >
          S
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${styles.button} ${editor.isActive('highlight') ? styles['is-active'] : ''}`}
          title="Highlight"
        >
          H
        </button>
        <div className={styles.divider} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles['is-active'] : ''}
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles['is-active'] : ''}
          title="Numbered List"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? styles['is-active'] : ''}
          title="Quote"
        >
          "
        </button>
        <div className={styles.divider} />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter the URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive('link') ? styles['is-active'] : ''}
          title="Add Link"
        >
          🔗
        </button>
        {onImageUpload && (
          <button
            type="button"
            onClick={addImage}
            className={styles.button}
            title="Add Image"
          >
            📷
          </button>
        )}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? styles['is-active'] : ''}
          title="Code Block"
        >
          {'</>'}
        </button>
        <div className={styles.divider} />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={styles.button}
          title="Undo"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={styles.button}
          title="Redo"
        >
          ↪
        </button>
      </div>
        <div className={styles.content}>
          <EditorContent editor={editor} />
        </div>
    </div>
  );
});

TiptapEditor.displayName = 'TiptapEditor';
export default TiptapEditor;
