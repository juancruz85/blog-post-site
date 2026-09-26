"use client";

import { useState } from "react";
import {
  useEditor,
  useEditorState,
  EditorContent,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import { Placeholder } from "@tiptap/extension-placeholder";

interface Props {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
}

interface Tool {
  label: string;
  title: string;
  run: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

const TOOLS: Tool[] = [
  {
    label: "B",
    title: "Bold",
    run: (e) => e.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive("bold"),
  },
  {
    label: "I",
    title: "Italic",
    run: (e) => e.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive("italic"),
  },
  {
    label: "H2",
    title: "Heading 2",
    run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (e) => e.isActive("heading", { level: 2 }),
  },
  {
    label: "H3",
    title: "Heading 3",
    run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (e) => e.isActive("heading", { level: 3 }),
  },
  {
    label: "• List",
    title: "Bullet list",
    run: (e) => e.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive("bulletList"),
  },
  {
    label: "1. List",
    title: "Numbered list",
    run: (e) => e.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive("orderedList"),
  },
  {
    label: "❝",
    title: "Blockquote",
    run: (e) => e.chain().focus().toggleBlockquote().run(),
    isActive: (e) => e.isActive("blockquote"),
  },
  {
    label: "</>",
    title: "Code block",
    run: (e) => e.chain().focus().toggleCodeBlock().run(),
    isActive: (e) => e.isActive("codeBlock"),
  },
];

export default function Tiptap({
  name = "content",
  defaultValue = "",
  placeholder = "Write your post…",
}: Props) {
  const [markdown, setMarkdown] = useState(defaultValue);

  const editor = useEditor({
    extensions: [StarterKit, Markdown, Placeholder.configure({ placeholder })],
    content: defaultValue,
    contentType: "markdown",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "ios-editor-surface" },
    },
    onUpdate: ({ editor }) => setMarkdown(editor.getMarkdown()),
  });

  const activeTools = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor ? TOOLS.map((tool) => tool.isActive(editor)) : [],
  });

  return (
    <div className="ios-editor">
      <div className="ios-editor-toolbar">
        {TOOLS.map((tool, index) => (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            aria-pressed={activeTools?.[index] ?? false}
            className={
              activeTools?.[index]
                ? "ios-editor-tool is-active"
                : "ios-editor-tool"
            }
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor && tool.run(editor)}
            disabled={!editor}
          >
            {tool.label}
          </button>
        ))}
      </div>

      <EditorContent editor={editor} />

      <input type="hidden" name={name} value={markdown} />
    </div>
  );
}
