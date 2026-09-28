import { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend, FiPlay, FiVolume2, FiVolumeX } from "react-icons/fi";
import { reels } from "../data/reels";
import { useApp } from "../context/AppContext";
import { formatCount } from "../utils/helpers";

function Reel({ reel }) {
  const { getUserById } = useApp();
  const user = getUserById(reel.userId);
  const box = useRef(null);
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  // Auto-play the reel that is mostly visible, pause the others
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const v = video.current;
      if (!v) return;
      if (entry.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.7 });
    observer.observe(box.current);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {}); else { v.pause(); setPlaying(false); }
  };

  return (
    <div className="reel" ref={box}>
      <video ref={video} src={reel.video} loop muted={muted} playsInline preload="metadata" onClick={toggle} />
      {!playing && <FiPlay className="reel-play" />}
      <button className="reel-mute" onClick={() => setMuted(!muted)} aria-label="Mute">{muted ? <FiVolumeX /> : <FiVolume2 />}</button>
      <div className="reel-actions">
        <button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}>{liked ? <FaHeart /> : <FaRegHeart />}<small>{formatCount(reel.likes + (liked ? 1 : 0))}</small></button>
        <button onClick={() => alert("Reel comments are a demo feature.")}><FaRegComment /><small>{reel.comments}</small></button>
        <button onClick={() => alert("Reel link copied (demo)!")}><FiSend /></button>
      </div>
      <div className="reel-info"><b>@{user.username}</b><p>{reel.caption}</p></div>
    </div>
  );
}

export default function Reels() {
  return <div className="reels">{reels.map((r) => <Reel key={r.id} reel={r} />)}</div>;
}
