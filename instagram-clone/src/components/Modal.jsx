import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ onClose, children, className = "" }) {
  // Close with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close"><FiX /></button>
        {children}
      </div>
    </div>
  );
}
