import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../lib/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center">Loading posts...</div>;
  if (error) return <div className="text-red text-center">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} to={`/posts/${post.slug}`} className="card">
          {post.image && (
            <img
              src={`${API_URL}/uploads/${post.image}`}
              alt={post.title}
              className="card-image"
            />
          )}
          <div className="card-body">
            <h2 className="heading-3">{post.title}</h2>
            <p className="text-gray line-clamp-3 mb-4">{post.content}</p>
            <div className="text-sm text-gray">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
      {posts.length === 0 && (
        <div className="text-center text-gray" style={{ gridColumn: "1 / -1" }}>
          No posts found.
        </div>
      )}
    </div>
  );
}
