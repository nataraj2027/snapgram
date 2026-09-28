import { useState } from "react";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";
import { timeAgo } from "../utils/helpers";

export default function CommentModal({ post, onClose }) {
  const { getUserById, addComment } = useApp();
  const [text, setText] = useState("");
  const send = () => { if (text.trim()) { addComment(post.id, text.trim()); setText(""); } };

  return (
    <Modal onClose={onClose}>
      <h3 className="modal-title">Comments</h3>
      <div className="comment-list">
        {post.comments.length === 0 && <div className="empty">No comments yet. Start the conversation!</div>}
        {post.comments.map((c) => {
          const u = getUserById(c.userId);
          return (
            <div className="comment" key={c.id}>
              <img className="avatar sm" src={u.avatar} alt="" />
              <div><b>{u.username}</b> {c.text}<div className="muted small">{timeAgo(c.createdAt)}</div></div>
            </div>
          );
        })}
      </div>
      <div className="comment-form">
        <input className="input" placeholder="Add a comment…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button className="btn" onClick={send} disabled={!text.trim()}>Post</button>
      </div>
    </Modal>
  );
}
