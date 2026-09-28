import { useApp } from "../context/AppContext";

// Circular avatar with a gradient ring (grey once viewed)
export default function Story({ story, viewed, onOpen }) {
  const { getUserById } = useApp();
  const user = getUserById(story.userId);
  return (
    <button className="story" onClick={() => onOpen(story)}>
      <span className={"ring" + (viewed ? " viewed" : "")}><img src={user.avatar} alt={user.username} /></span>
      <span className="story-name">{user.username}</span>
    </button>
  );
}
