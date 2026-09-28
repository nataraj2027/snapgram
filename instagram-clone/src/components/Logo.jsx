import logo from "../assets/logo.svg";

// Original gradient camera-style logo + wordmark
export default function Logo({ size = 34, text = true }) {
  return (
    <div className="logo">
      <img src={logo} width={size} height={size} alt="Snapgram logo" />
      {text && <span className="logo-text">Snapgram</span>}
    </div>
  );
}
