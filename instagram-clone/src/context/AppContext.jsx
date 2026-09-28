import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { sampleUsers, demoAccount, demoFollowing } from "../data/users";
import { samplePosts } from "../data/posts";
import { stories } from "../data/stories";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  // Every piece of persistent state uses the localStorage hook
  const [accounts, setAccounts] = useLocalStorage("snap_accounts", [demoAccount]);
  const [userId, setUserId] = useLocalStorage("snap_currentUserId", null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [posts, setPosts] = useLocalStorage("snap_posts", samplePosts);
  const [followMap, setFollowMap] = useLocalStorage("snap_following", { me: demoFollowing });
  const [saved, setSaved] = useLocalStorage("snap_saved", []);
  const [theme, setTheme] = useLocalStorage("snap_theme", "light");

  // Apply the theme class to <html> so the CSS variables switch
  useEffect(() => { document.documentElement.className = theme; }, [theme]);

  const allUsers = [...sampleUsers, ...accounts];
  const currentUser = isLoggedIn ? accounts.find((a) => a.id === userId) || null : null;
  const following = currentUser ? followMap[currentUser.id] || [] : [];
  const getUserById = (id) => allUsers.find((u) => u.id === id) || { id, username: "unknown", name: "Unknown", avatar: "" };

  const value = {
    currentUser, isAuthenticated: !!currentUser, posts, saved, theme, allUsers, following, stories,
    getUserById,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),

    login(identifier, password) {
      const key = identifier.toLowerCase();
      const acc = accounts.find((a) => a.username.toLowerCase() === key || a.email.toLowerCase() === key);
      if (!acc || acc.password !== password) return "Invalid username or password.";
      setUserId(acc.id); setIsLoggedIn(true);
      return null;
    },
    register({ name, username, email, password }) {
      if (allUsers.some((u) => u.username.toLowerCase() === username.toLowerCase())) return "Username already taken.";
      if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) return "Email already registered.";
      const acc = { id: "u_" + Date.now(), username, name, email, password, bio: "", followers: 0, avatar: `https://i.pravatar.cc/150?u=${username}` };
      setAccounts([...accounts, acc]); setUserId(acc.id); setIsLoggedIn(true);
      return null;
    },
    logout() { setIsLoggedIn(false); setUserId(null); },
    updateProfile: (changes) => setAccounts(accounts.map((a) => (a.id === currentUser.id ? { ...a, ...changes } : a))),

    addPost: (image, caption) =>
      setPosts([{ id: "p_" + Date.now(), userId: currentUser.id, image, caption, likes: 0, likedBy: [], createdAt: new Date().toISOString(), comments: [] }, ...posts]),
    deletePost: (id) => setPosts(posts.filter((p) => p.id !== id)),
    toggleLike: (id) =>
      setPosts(posts.map((p) => {
        if (p.id !== id) return p;
        const liked = p.likedBy.includes(currentUser.id);
        return { ...p, likes: p.likes + (liked ? -1 : 1), likedBy: liked ? p.likedBy.filter((x) => x !== currentUser.id) : [...p.likedBy, currentUser.id] };
      })),
    addComment: (id, text) =>
      setPosts(posts.map((p) => p.id === id ? { ...p, comments: [...p.comments, { id: "c_" + Date.now(), userId: currentUser.id, text, createdAt: new Date().toISOString() }] } : p)),
    toggleSave: (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),

    isFollowing: (id) => following.includes(id),
    toggleFollow: (id) => setFollowMap({ ...followMap, [currentUser.id]: following.includes(id) ? following.filter((x) => x !== id) : [...following, id] }),
    getFollowersCount: (u) => (u.id === currentUser?.id ? u.followers : u.followers + (following.includes(u.id) ? 1 : 0)),
    getFollowingCount: (u) => (u.id === currentUser?.id ? following.length : u.following),
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
