import { useApp } from "../context/AppContext";
import { sampleUsers } from "../data/users";
import { hoursAgo, timeAgo } from "../utils/helpers";

const texts = ["liked your post.", "commented: Love this shot!", "started following you.", "mentioned you in a comment."];

export default function Notifications() {
  const { isFollowing, toggleFollow } = useApp();
  const items = sampleUsers.slice(0, 10).map((u, i) => ({ user: u, text: texts[i % 4], time: hoursAgo(i * 4 + 1) }));
  return (
    <div className="col">
      <h2 className="page-title">Notifications</h2>
      <div className="panel">
        {items.map(({ user, text, time }) => (
          <div className="user-card" key={user.id}>
            <img className="avatar" src={user.avatar} alt="" />
            <div className="user-info"><span><b>{user.username}</b> {text}</span><span className="muted small">{timeAgo(time)}</span></div>
            {text.startsWith("started") && <button className={isFollowing(user.id) ? "btn ghost" : "btn"} onClick={() => toggleFollow(user.id)}>{isFollowing(user.id) ? "Following" : "Follow back"}</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
