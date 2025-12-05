import { useState } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="page">
      <main className="main">
        <h1 className="heading-1">SEO Blog</h1>

        {user && <CreatePost onPostCreated={handlePostCreated} />}

        <h2 className="heading-2">Latest Posts</h2>
        <PostList key={refreshKey} />
      </main>
    </div>
  );
}
