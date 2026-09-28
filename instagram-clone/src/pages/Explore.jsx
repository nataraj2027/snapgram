import PostGrid from "../components/PostGrid";
import { useApp } from "../context/AppContext";

export default function Explore() {
  const { posts } = useApp();
  return (
    <div className="col wide">
      <h2 className="page-title">Explore</h2>
      {posts.length ? <PostGrid posts={posts} featured /> : <div className="empty">Nothing to explore yet.</div>}
    </div>
  );
}
