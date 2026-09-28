const raw = [
  ["alex.travels", "Alex Morgan", "Chasing sunrises around the world ✈️"],
  ["sara_codes", "Sara Khan", "Frontend dev • Coffee • Open source 💻"],
  ["leo.fitness", "Leo Brooks", "Trainer. Small habits, big change 💪"],
  ["mia.bakes", "Mia Laurent", "Home baker. Sourdough addict 🍞"],
  ["noah_shots", "Noah Fischer", "Photographer • Golden hour hunter 📸"],
  ["emma.arts", "Emma Rossi", "Watercolor artist 🎨"],
  ["ravi.kumar", "Ravi Kumar", "Sea lover. Sunset collector 🌅"],
  ["zoe.plants", "Zoe Bennett", "Plant mom of 42 🌿"],
  ["kabir_music", "Kabir Sharma", "Guitarist • Songwriter 🎸"],
  ["lily.reads", "Lily Chen", "Books, tea and rainy days 📚"],
  ["chef.marco", "Marco Bianchi", "Pasta is a love language 🍝"],
  ["yuki.designs", "Yuki Tanaka", "UI designer • Minimal is more ✏️"],
  ["omar.rides", "Omar Haddad", "Cyclist. 10,000 km this year 🚴"],
  ["nina.dances", "Nina Petrova", "Dance is my therapy 💃"],
  ["dev.patel", "Dev Patel", "Full-stack dev. Ship it 🚀"],
  ["ava.wanders", "Ava Johnson", "Hiking trails & hot chocolate 🥾"],
  ["tom.gamer", "Tom Nguyen", "Speedruns and retro consoles 🎮"],
  ["isla.paints", "Isla Murray", "Murals and moody skies 🖌️"],
  ["sam.surfs", "Sam Torres", "Salt water heals everything 🏄"],
  ["priya.eats", "Priya Nair", "Street food explorer 🌶️"],
];
const avatars = [11, 47, 12, 45, 15, 44, 33, 49, 52, 32, 5, 9, 20, 25, 26, 36, 53, 58, 60, 64];

// 20 sample users other people in the app
export const sampleUsers = raw.map(([username, name, bio], i) => ({
  id: "u" + (i + 1),
  username,
  name,
  bio,
  avatar: `https://i.pravatar.cc/150?img=${avatars[i]}`,
  followers: 1200 + ((i * 937) % 15000),
  following: 120 + ((i * 41) % 500),
}));

// Built-in demo account: login with  demo / demo123
export const demoAccount = {
  id: "me",
  username: "demo",
  name: "Demo User",
  email: "demo@example.com",
  password: "demo123", // mock only - real apps never store plain passwords
  bio: "Frontend internship project ✨",
  avatar: "https://i.pravatar.cc/150?img=68",
  followers: 128,
};
export const demoFollowing = ["u1", "u2", "u3", "u5"];
