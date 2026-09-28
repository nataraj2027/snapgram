// 12 stories: one per user (userId matches users.js)
export const stories = Array.from({ length: 12 }, (_, i) => ({
  id: "s" + (i + 1),
  userId: "u" + (i + 1),
  image: `https://picsum.photos/seed/snap-story-${i + 1}/600/1000`,
}));
