"use client";

import { useActionState } from "react";
import {
  updatePost,
  type PostActionState,
} from "@/lib/actions/posts";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

export default function EditPostForm({ post }: Props) {
  const boundAction = updatePost.bind(null, post.id);
  const [state, formAction, pending] = useActionState<PostActionState, FormData>(
    boundAction,
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
          defaultValue={post.title}
          required
          className="ios-form-input"
        />
      </label>

      <label className="ios-form-label">
        Category
        <input
          type="text"
          name="category"
          defaultValue={post.category ?? ""}
          className="ios-form-input"
        />
      </label>

      <label className="ios-form-label">
        Content (Markdown)
        <textarea
          name="content"
          defaultValue={post.content}
          required
          rows={16}
          className="ios-form-textarea"
        />
      </label>

      <button type="submit" disabled={pending} className="ios-button">
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
