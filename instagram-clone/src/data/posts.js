import { hoursAgo } from "../utils/helpers";

const captions = [
  "Sunrise above the clouds ⛰️ #travel", "Shipped my first React project 💻", "Morning run done 🏃 #fitness",
  "Fresh sourdough 🍞", "Golden hour never disappoints 📸", "Watercolor sketch from the weekend 🎨",
  "Evening walks by the sea 🌊", "New monstera leaf 🌿", "Late night jam session 🎸", "Cozy mystery and a big mug of tea 📚",
  "Homemade pasta night 🍝", "Design system in progress ✏️", "100 km ride done! 🚴", "Rehearsal vibes 💃",
  "Deploy day 🚀", "Trail views worth the climb 🥾", "New personal best 🎮", "Finished the mural! 🖌️",
  "Perfect waves today 🏄", "Best street food in town 🌶️",
];
const comments = ["Love this! 🔥", "Amazing shot 😍", "Goals!", "So good 👏", "Wow, where is this?", "Made my day ✨", "Need this in my life", "Beautiful colors 🎨"];

// 32 posts; each has its own likes, likedBy and comments so the feed is fully interactive
export const samplePosts = Array.from({ length: 32 }, (_, i) => ({
  id: "p" + (i + 1),
  userId: "u" + (((i * 7) % 20) + 1),
  image: `https://picsum.photos/seed/snap-${i + 1}/800/800`,
  caption: captions[i % captions.length],
  likes: 120 + ((i * 373) % 4800),
  likedBy: [],
  createdAt: hoursAgo(1 + i * 3),
  comments: Array.from({ length: i % 4 }, (_, j) => ({
    id: `c${i}_${j}`,
    userId: "u" + (((i + j * 3 + 2) % 20) + 1),
    text: comments[(i + j) % comments.length],
    createdAt: hoursAgo(i * 3 + j),
  })),
}));
