import { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import Modal from "./Modal";
import Post from "./Post";
import { useApp } from "../context/AppContext";

// Reusable grid (Explore / Search / Profile). Clicking a tile opens the full post in a modal.
export default function PostGrid({ posts, featured = false }) {
  const { posts: allPosts } = useApp();
  const [selected, setSelected] = useState(null);
  const current = allPosts.find((p) => p.id === selected); // read from context so likes stay live

  return (
    <>
      <div className="grid">
        {posts.map((p, i) => (
          <button key={p.id} className={"tile" + (featured && i % 7 === 4 ? " big" : "")} onClick={() => setSelected(p.id)}>
            <img src={p.image} alt={p.caption} loading="lazy" />
            <span className="tile-over"><FaHeart /> {p.likes} <FaComment /> {p.comments.length}</span>
          </button>
        ))}
      </div>
      {current && <Modal onClose={() => setSelected(null)} className="post-modal"><Post post={current} /></Modal>}
    </>
  );
}
