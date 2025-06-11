import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, Image as ImageIcon, Code, Quote, Undo, Redo, Strikethrough } from 'lucide-react';

const lowlight = createLowlight(common);

function TipTapEditor({ content, onChange, disabled }: { content: string; onChange: (content: string) => void; disabled?: boolean }) {
  const [linkUrl, setLinkUrl] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [showLinkInput, setShowLinkInput] = React.useState(false);
  const [showImageInput, setShowImageInput] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const ToolbarButton = ({ onClick, isActive, icon: Icon, title }: { onClick: () => void; isActive?: boolean; icon: React.ElementType; title: string }) => (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      className={isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}
      title={title}
      disabled={disabled}
    >
      <Icon size={16} />
    </Button>
  );

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 text-gray-900 dark:text-white">
        {/* Text Style */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} title="Bold" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} title="Italic" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={UnderlineIcon} title="Underline" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={Strikethrough} title="Strikethrough" />
        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={Heading1} title="Heading 1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={Heading2} title="Heading 2" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={Heading3} title="Heading 3" />
        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={List} title="Bullet List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={ListOrdered} title="Numbered List" />
        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Align Left" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Align Center" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={AlignRight} title="Align Right" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} icon={AlignJustify} title="Justify" />
        {/* Special Elements */}
        <ToolbarButton onClick={() => setShowLinkInput(true)} isActive={editor.isActive('link')} icon={LinkIcon} title="Add Link" />
        <ToolbarButton onClick={() => setShowImageInput(true)} icon={ImageIcon} title="Add Image" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={Code} title="Code Block" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={Quote} title="Blockquote" />
        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} title="Undo" />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} title="Redo" />
      </div>
      {/* Link Input */}
      {showLinkInput && (
        <div className="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 px-3 py-1.5 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={addLink} size="sm" className="bg-blue-600 text-white">Add</Button>
            <Button onClick={() => { setShowLinkInput(false); setLinkUrl(''); }} size="sm" variant="ghost">Cancel</Button>
          </div>
        </div>
      )}
      {/* Image Input */}
      {showImageInput && (
        <div className="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1 px-3 py-1.5 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={addImage} size="sm" className="bg-blue-600 text-white">Add</Button>
            <Button onClick={() => { setShowImageInput(false); setImageUrl(''); }} size="sm" variant="ghost">Cancel</Button>
          </div>
        </div>
      )}
      <EditorContent editor={editor} className="prose prose-sm max-w-none p-4 min-h-[120px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none" />
    </div>
  );
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostFormData) => void;
  initialData?: PostFormData;
  mode?: 'create' | 'edit';
}

interface PostFormData {
  title: string;
  content: string;
  author: string;
  // Add other fields as needed
}

export function PostModal({ isOpen, onClose, onSubmit, initialData, mode = 'create' }: PostModalProps) {
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [body, setBody] = React.useState(initialData?.content || '');

  React.useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || '');
      setBody(initialData?.content || '');
    }
  }, [initialData, isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, content: body, author: initialData?.author || '' });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              {mode === 'edit' ? 'Edit Post' : 'Add Post'}
            </DialogTitle>
          </DialogHeader>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              placeholder="Enter post title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200" htmlFor="body">Body</label>
            <TipTapEditor content={body} onChange={setBody} />
          </div>
          <DialogFooter>
            <Button type="button" className="cursor-pointer bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white">
              {mode === 'edit' ? 'Update Post' : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 