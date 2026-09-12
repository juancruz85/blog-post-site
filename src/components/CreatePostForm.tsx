"use client";

import { useActionState } from "react";
import {
  createPost,
  type PostActionState,
} from "@/lib/actions/posts";

export default function CreatePostForm() {
  const [state, formAction, pending] = useActionState<PostActionState, FormData>(
    createPost,
    null,
  );

  return (
    <form action={formAction} className="ios-edit-form">
      {state?.error && <p className="ios-form-error">{state.error}</p>}

      <label className="ios-form-label">
        Title
        <input
          type="text"
          name="title"
          required
          className="ios-form-input"
          placeholder="Post title"
        />
      </label>

      <label className="ios-form-label">
        Category
        <input
          type="text"
          name="category"
          className="ios-form-input"
          placeholder="e.g. help, news"
        />
      </label>

      <label className="ios-form-label">
        Content (Markdown)
        <textarea
          name="content"
          required
          rows={16}
          className="ios-form-textarea"
          placeholder="# Write your post in markdown..."
        />
      </label>

      <button type="submit" disabled={pending} className="ios-button">
        {pending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
