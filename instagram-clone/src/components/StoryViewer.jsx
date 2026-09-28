import { useEffect } from "react";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";

const DURATION = 5000; // ms before the story closes automatically

export default function StoryViewer({ story, onClose }) {
  const { getUserById } = useApp();
  const user = getUserById(story.userId);

  useEffect(() => {
    const timer = setTimeout(onClose, DURATION);
    return () => clearTimeout(timer); // cleanup avoids closing twice
  }, [story, onClose]);

  return (
    <Modal onClose={onClose} className="story-modal">
      <div className="story-progress"><i style={{ animationDuration: `${DURATION}ms` }} /></div>
      <div className="story-head"><img className="avatar" src={user.avatar} alt="" /><b>{user.username}</b></div>
      <img className="story-img" src={story.image} alt={`${user.username}'s story`} />
    </Modal>
  );
}
