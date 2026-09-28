import { NavLink } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { NAV } from "./Sidebar";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";

// Mobile navigation: top bar + bottom tabs (Home, Search, Create, Notifications, Profile)
export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const mobileItems = [NAV[0], NAV[1], NAV[6], NAV[5], NAV[7]];
  return (
    <>
      <header className="topbar">
        <Logo size={28} />
        <button onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? <FiSun /> : <FiMoon />}</button>
      </header>
      <nav className="bottombar">
        {mobileItems.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} end={to === "/"} aria-label={label} className={({ isActive }) => (isActive ? "active" : "")}><Icon /></NavLink>
        ))}
      </nav>
    </>
  );
}
