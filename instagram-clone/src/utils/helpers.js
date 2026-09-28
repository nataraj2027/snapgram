export const hoursAgo = (h) => new Date(Date.now() - h * 36e5).toISOString();

export function timeAgo(iso) {
  const s = (Date.now() - new Date(iso)) / 1000;
  for (const [l, n] of [["w", 604800], ["d", 86400], ["h", 3600], ["m", 60]])
    if (s >= n) return `${Math.floor(s / n)}${l} ago`;
  return "Just now";
}
export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
export const formatCount = (n) =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(".0", "") + "M" : n >= 1e3 ? (n / 1e3).toFixed(1).replace(".0", "") + "K" : String(n);

export const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const isValidUsername = (u) => /^[a-zA-Z0-9._]{3,20}$/.test(u);

// FileReader + canvas resize: keeps images small enough for localStorage (~5MB limit)
export function readImage(file, max = 800) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) return reject(new Error("Please choose an image file."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("This file is not a valid image."));
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
