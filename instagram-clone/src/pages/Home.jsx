import { useEffect, useState } from "react";
import Story from "../components/Story";
import StoryViewer from "../components/StoryViewer";
import Post from "../components/Post";
import UserCard from "../components/UserCard";
import { useApp } from "../context/AppContext";

const PAGE = 8; // posts shown per "Load more"

export default function Home() {
  const { posts, stories, allUsers, currentUser, following } = useApp();
  const [active, setActive] = useState(null);
  const [viewed, setViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(PAGE);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  const open = (s) => { setActive(s); setViewed((v) => [...new Set([...v, s.id])]); };
  const suggestions = allUsers.filter((u) => u.id !== currentUser.id && !following.includes(u.id)).slice(0, 5);

  return (
    <div className="home">
      <section className="feed">
        <div className="stories">{stories.map((s) => <Story key={s.id} story={s} viewed={viewed.includes(s.id)} onOpen={open} />)}</div>
        {loading ? (
          [1, 2].map((n) => <div key={n} className="skeleton" />)
        ) : posts.length === 0 ? (
          <div className="empty">No posts yet — create the first one!</div>
        ) : (
          <>
            {posts.slice(0, visible).map((p) => <Post key={p.id} post={p} />)}
            {visible < posts.length && <button className="btn ghost wide" onClick={() => setVisible(visible + PAGE)}>Load more</button>}
          </>
        )}
      </section>
      <aside className="suggest">
        <div className="me-row"><img className="avatar" src={currentUser.avatar} alt="" /><div><b>{currentUser.username}</b><div className="muted">{currentUser.name}</div></div></div>
        <h4>Suggested for you</h4>
        {suggestions.length ? suggestions.map((u) => <UserCard key={u.id} user={u} />) : <p className="muted">You're following everyone!</p>}
      </aside>
      {active && <StoryViewer story={active} onClose={() => setActive(null)} />}
    </div>
  );
}
