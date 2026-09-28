import { useState } from "react";
import UserCard from "../components/UserCard";
import PostGrid from "../components/PostGrid";
import { useApp } from "../context/AppContext";

export default function Search() {
  const { allUsers, posts } = useApp();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("users");
  const q = query.toLowerCase().trim();

  // Filtering happens on every keystroke using React state
  const users = allUsers.filter((u) => u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
  const found = posts.filter((p) => p.caption.toLowerCase().includes(q));

  return (
    <div className="col">
      <input className="input big-input" placeholder="Search users or posts…" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
      <div className="tabs">
        <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>Users ({users.length})</button>
        <button className={tab === "posts" ? "on" : ""} onClick={() => setTab("posts")}>Posts ({found.length})</button>
      </div>
      {tab === "users"
        ? users.length ? <div className="panel">{users.map((u) => <UserCard key={u.id} user={u} />)}</div> : <div className="empty">No users match "{query}".</div>
        : found.length ? <PostGrid posts={found} /> : <div className="empty">No posts match "{query}".</div>}
    </div>
  );
}
