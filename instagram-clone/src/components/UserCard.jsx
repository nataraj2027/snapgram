import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function UserCard({ user }) {
  const { currentUser, isFollowing, toggleFollow } = useApp();
  const navigate = useNavigate();
  const following = isFollowing(user.id);
  return (
    <div className="user-card">
      <img className="avatar" src={user.avatar} alt={user.username} />
      <div className="user-info" onClick={() => navigate(`/profile/${user.username}`)}>
        <b>{user.username}</b>
        <span className="muted">{user.name}</span>
      </div>
      {user.id !== currentUser.id && (
        <button className={following ? "btn ghost" : "btn"} onClick={() => toggleFollow(user.id)}>{following ? "Following" : "Follow"}</button>
      )}
    </div>
  );
}
