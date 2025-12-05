import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug, updatePost } from "../lib/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: null,
  });
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);
        if (!data) {
          setError("Post not found");
        } else {
          setPost(data);
          setFormData({
            title: data.title,
            slug: data.slug,
            content: data.content,
            image: null,
          });
          if (data.image) {
            setImagePreview(`${API_URL}/uploads/${data.image}`);
          }
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await updatePost(post._id, formData);
      navigate(`/posts/${formData.slug}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

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
        <Link to="/">&larr; Back to Home</Link>
      </div>
    );

  return (
    <div className="container" style={{ maxWidth: "48rem", padding: "1.5rem" }}>
      <h1 className="heading-1">Edit Post</h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-file"
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray mb-4">Current/Preview Image:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="form-textarea"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Link to={`/posts/${slug}`} className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
