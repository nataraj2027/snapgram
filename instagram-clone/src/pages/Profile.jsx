import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiGrid, FiBookmark } from "react-icons/fi";
import Modal from "../components/Modal";
import PostGrid from "../components/PostGrid";
import { useApp } from "../context/AppContext";
import { readImage, isValidUsername } from "../utils/helpers";

function EditProfile({ user, onClose }) {
  const { allUsers, updateProfile } = useApp();
  const [form, setForm] = useState({ name: user.name, username: user.username, bio: user.bio, avatar: user.avatar });
  const [error, setError] = useState("");

  const pick = async (e) => {
    try { setForm({ ...form, avatar: await readImage(e.target.files[0], 300) }); }
    catch (err) { setError(err.message); }
  };
  const save = () => {
    if (!form.name.trim()) return setError("Name is required.");
    if (!isValidUsername(form.username)) return setError("Username: 3-20 letters, numbers, dots or underscores.");
    if (allUsers.some((u) => u.id !== user.id && u.username.toLowerCase() === form.username.toLowerCase())) return setError("Username already taken.");
    updateProfile({ ...form, name: form.name.trim() }); // profile page re-renders instantly
    onClose();
  };
  return (
    <Modal onClose={onClose}>
      <div className="edit">
        <h3>Edit profile</h3>
        <label className="avatar-pick"><img className="avatar xl" src={form.avatar} alt="" /><span className="accent">Change photo</span><input type="file" accept="image/*" hidden onChange={pick} /></label>
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <textarea className="input" rows="3" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        {error && <div className="error">{error}</div>}
        <button className="btn wide" onClick={save}>Save</button>
      </div>
    </Modal>
  );
}

export default function Profile() {
  const { username } = useParams();
  const { currentUser, allUsers, posts, saved, isFollowing, toggleFollow, getFollowersCount, getFollowingCount } = useApp();
  const [tab, setTab] = useState("posts");
  const [editing, setEditing] = useState(false);

  const user = username ? allUsers.find((u) => u.username === username) : currentUser;
  if (!user) return <div className="empty">User "{username}" not found.</div>;

  const mine = user.id === currentUser.id;
  const userPosts = posts.filter((p) => p.userId === user.id);
  const savedPosts = posts.filter((p) => saved.includes(p.id));
  const shown = tab === "posts" || !mine ? userPosts : savedPosts;

  return (
    <div className="col wide">
      <div className="profile-head">
        <img className="avatar xxl" src={user.avatar} alt={user.username} />
        <div className="profile-info">
          <div className="profile-top">
            <h2>{user.username}</h2>
            {mine
              ? <button className="btn ghost" onClick={() => setEditing(true)}>Edit Profile</button>
              : <button className={isFollowing(user.id) ? "btn ghost" : "btn"} onClick={() => toggleFollow(user.id)}>{isFollowing(user.id) ? "Unfollow" : "Follow"}</button>}
          </div>
          <div className="stats">
            <span><b>{userPosts.length}</b> Posts</span>
            <span><b>{getFollowersCount(user).toLocaleString()}</b> Followers</span>
            <span><b>{getFollowingCount(user).toLocaleString()}</b> Following</span>
          </div>
          <b>{user.name}</b>
          <p className="bio">{user.bio || "No bio yet."}</p>
        </div>
      </div>
      <div className="tabs center">
        <button className={tab === "posts" || !mine ? "on" : ""} onClick={() => setTab("posts")}><FiGrid /> Posts</button>
        {mine && <button className={tab === "saved" ? "on" : ""} onClick={() => setTab("saved")}><FiBookmark /> Saved</button>}
      </div>
      {shown.length ? <PostGrid posts={shown} /> : <div className="empty">{tab === "saved" && mine ? "Bookmark posts to see them here." : "No posts yet."}</div>}
      {editing && <EditProfile user={user} onClose={() => setEditing(false)} />}
    </div>
  );
}
