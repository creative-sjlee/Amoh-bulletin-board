// PostItem.js
import React from "react";
import Accordion from "./Accordion";

export default function PostListItem({ post, onUpdate, onDelete }) {
  return (
      <Accordion
        title={post.title}
        content={post.content}
        images={[post.images1, post.images2, post.images3].filter(Boolean)}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
  );
};
