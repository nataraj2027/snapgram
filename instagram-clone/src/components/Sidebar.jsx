import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiCompass, FiFilm, FiMessageCircle, FiHeart, FiPlusSquare, FiUser, FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";

export const NAV = [
  ["/", FiHome, "Home"], ["/search", FiSearch, "Search"], ["/explore", FiCompass, "Explore"], ["/reels", FiFilm, "Reels"],
  ["/messages", FiMessageCircle, "Messages"], ["/notifications", FiHeart, "Notifications"],
  ["/create", FiPlusSquare, "Create"], ["/profile", FiUser, "Profile"],
];

// Desktop / tablet navigation
export default function Sidebar() {
  const { theme, toggleTheme, logout } = useApp();
  return (
    <nav className="sidebar">
      <Logo />
      {NAV.map(([to, Icon, label]) => (
        <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          <Icon /><span>{label}</span>
        </NavLink>
      ))}
      <div className="grow" />
      <button className="nav-link" onClick={toggleTheme}>{theme === "dark" ? <FiSun /> : <FiMoon />}<span>{theme === "dark" ? "Light mode" : "Dark mode"}</span></button>
      <button className="nav-link" onClick={logout}><FiLogOut /><span>Log out</span></button>
    </nav>
  );
}
