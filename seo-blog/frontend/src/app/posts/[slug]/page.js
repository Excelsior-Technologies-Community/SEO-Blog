"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug, deletePost } from "../../../lib/api";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);
        if (!data) {
          setError("Post not found");
        } else {
          setPost(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading)
    return (
      <div className="text-center" style={{ padding: "2rem" }}>
        Loading post...
      </div>
    );
  if (error)
    return (
      <div className="text-center" style={{ padding: "2rem" }}>
        <div className="text-red mb-4">{error}</div>
        <Link href="/">&larr; Back to Home</Link>
      </div>
    );

  return (
    <div className="container" style={{ maxWidth: "56rem", padding: "1.5rem" }}>
      <Link href="/" style={{ display: "inline-block", marginBottom: "2rem" }}>
        &larr; Back to Home
      </Link>

      <article className="card">
        {post.image && (
          <img
            src={`${API_URL}/uploads/${post.image}`}
            alt={post.title}
            style={{ width: "100%", height: "24rem", objectFit: "cover" }}
          />
        )}
        <div style={{ padding: "2rem" }}>
          <h1
            className="heading-1"
            style={{ textAlign: "left", marginBottom: "1rem" }}
          >
            {post.title}
          </h1>
          <div
            className="text-gray mb-8"
            style={{
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.75" }}>
            {post.content}
          </div>
        </div>
      </article>

      {user && (
        <div
          className="flex gap-4 mt-8"
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <Link href={`/posts/${post.slug}/edit`} className="btn btn-primary">
            Edit Post
          </Link>
          <button
            onClick={async () => {
              if (confirm("Are you sure you want to delete this post?")) {
                try {
                  await deletePost(post._id);
                  window.location.href = "/";
                } catch (err) {
                  alert(err.message);
                }
              }
            }}
            className="btn btn-danger"
          >
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
