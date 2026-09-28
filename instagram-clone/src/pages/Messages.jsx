import { useState } from "react";
import { useApp } from "../context/AppContext";
import { sampleUsers } from "../data/users";

const first = ["Hey! Loved your latest post 🙌", "Where was that photo taken?", "Sending you the recipe!", "Jam session this weekend? 🎸", "Did you see the new update?", "Coffee tomorrow?"];

export default function Messages() {
  const { getUserById } = useApp();
  const [chats, setChats] = useState(() => sampleUsers.slice(1, 7).map((u, i) => ({ userId: u.id, msgs: [{ mine: false, text: first[i] }] })));
  const [sel, setSel] = useState(0);
  const [text, setText] = useState("");
  const chat = chats[sel];

  const send = () => {
    if (!text.trim()) return;
    const mine = { mine: true, text: text.trim() };
    setChats((cs) => cs.map((c, i) => (i === sel ? { ...c, msgs: [...c.msgs, mine] } : c)));
    setText("");
    // Fake auto-reply so the chat feels alive
    setTimeout(() => setChats((cs) => cs.map((c, i) => (i === sel ? { ...c, msgs: [...c.msgs, { mine: false, text: "Sounds great! 😄" }] } : c))), 1000);
  };

  return (
    <div className="col wide">
      <div className="chat">
        <div className="chat-list">
          {chats.map((c, i) => { const u = getUserById(c.userId); return (
            <div key={c.userId} className={"chat-item" + (i === sel ? " on" : "")} onClick={() => setSel(i)}>
              <img className="avatar" src={u.avatar} alt="" /><div><b>{u.username}</b><div className="muted small">{c.msgs[c.msgs.length - 1].text.slice(0, 26)}</div></div>
            </div>); })}
        </div>
        <div className="chat-box">
          <div className="chat-msgs">{chat.msgs.map((m, i) => <div key={i} className={"bubble" + (m.mine ? " mine" : "")}>{m.text}</div>)}</div>
          <div className="comment-form">
            <input className="input" placeholder="Message…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
            <button className="btn" onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
