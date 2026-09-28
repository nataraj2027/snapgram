import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaRegComment, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FiSend, FiTrash2 } from "react-icons/fi";
import CommentModal from "./CommentModal";
import { useApp } from "../context/AppContext";
import { timeAgo, formatDateTime } from "../utils/helpers";

export default function Post({ post }) {
  const { currentUser, getUserById, toggleLike, toggleSave, saved, deletePost } = useApp();
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [burst, setBurst] = useState(false);
  const author = getUserById(post.userId);
  const liked = post.likedBy.includes(currentUser.id);

  // Double-click the photo to like it (with a heart animation)
  const onDoubleClick = () => {
    if (!liked) toggleLike(post.id);
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`); alert("Post link copied!"); }
    catch { alert("Could not copy the link."); }
  };

  return (
    <article className="post">
      <header className="post-head">
        <img className="avatar" src={author.avatar} alt="" onClick={() => navigate(`/profile/${author.username}`)} />
        <b className="link" onClick={() => navigate(`/profile/${author.username}`)}>{author.username}</b>
        <span className="muted">• {timeAgo(post.createdAt)}</span>
        {author.id === currentUser.id && (
          <button className="icon-btn push" aria-label="Delete post" onClick={() => window.confirm("Delete this post?") && deletePost(post.id)}><FiTrash2 /></button>
        )}
      </header>
      <div className="post-media" onDoubleClick={onDoubleClick}>
        <img src={post.image} alt={post.caption} loading="lazy" />
        {burst && <FaHeart className="burst" />}
      </div>
      <div className="post-actions">
        <button className={"icon-btn" + (liked ? " liked" : "")} onClick={() => toggleLike(post.id)} aria-label="Like">{liked ? <FaHeart /> : <FaRegHeart />}</button>
        <button className="icon-btn" onClick={() => setShowComments(true)} aria-label="Comment"><FaRegComment /></button>
        <button className="icon-btn" onClick={share} aria-label="Share"><FiSend /></button>
        <button className="icon-btn push" onClick={() => toggleSave(post.id)} aria-label="Bookmark">{saved.includes(post.id) ? <FaBookmark /> : <FaRegBookmark />}</button>
      </div>
      <div className="post-body">
        <b>{post.likes.toLocaleString()} likes</b>
        <p><b>{author.username}</b> {post.caption}</p>
        <button className="link-btn" onClick={() => setShowComments(true)}>{post.comments.length ? `View all ${post.comments.length} comments` : "Add a comment"}</button>
        <div className="muted small">{formatDateTime(post.createdAt)}</div>
      </div>
      {showComments && <CommentModal post={post} onClose={() => setShowComments(false)} />}
    </article>
  );
}
