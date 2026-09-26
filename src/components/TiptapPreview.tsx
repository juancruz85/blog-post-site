"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";

interface Props {
  content: string;
  fallback: string;
}

export default function TiptapPreview({ content, fallback }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content,
    contentType: "markdown",
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "ios-editor-surface is-preview" },
    },
  });

  if (!editor) {
    return <p className="ios-post-excerpt">{fallback}</p>;
  }

  return (
    <div className="ios-post-excerpt">
      <EditorContent editor={editor} />
    </div>
  );
}
