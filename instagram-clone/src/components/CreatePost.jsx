import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { readImage } from "../utils/helpers";

export default function CreatePost() {
  const { addPost } = useApp();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const onFile = async (e) => {
    try { setError(""); setImage(await readImage(e.target.files[0])); }
    catch (err) { setError(err.message); }
  };
  const share = () => { addPost(image, caption.trim()); navigate("/"); };

  return (
    <div className="col">
      <div className="panel">
        <h2>Create new post</h2>
        <label className="drop">
          {image ? <img src={image} alt="Preview" /> : <><FiImage size={42} /><span>Click to select a photo</span></>}
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </label>
        <textarea className="input" rows="3" maxLength={300} placeholder="Write a caption…" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <div className="muted small">{caption.length}/300</div>
        {error && <div className="error">{error}</div>}
        <button className="btn wide" disabled={!image} onClick={share}>Share</button>
      </div>
    </div>
  );
}
