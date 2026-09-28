const B = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";
const list = [
  ["ForBiggerBlazes", "u1", "Fire and motion 🔥 #reels"], ["ForBiggerEscapes", "u5", "Escape the ordinary 🌄"],
  ["ForBiggerFun", "u9", "Just for fun 🎶"], ["ForBiggerJoyrides", "u13", "Weekend joyride 🚗"],
  ["ForBiggerMeltdowns", "u2", "When the build fails 😅"], ["SubaruOutbackOnStreetAndDirt", "u16", "Off the beaten path 🌲"],
  ["WeAreGoingOnBullrun", "u17", "Road trip mode on 🏁"], ["WhatCarCanYouGetForAGrand", "u15", "Budget challenge 💸"],
];
export const reels = list.map(([f, userId, caption], i) => ({
  id: "r" + (i + 1), userId, video: `${B}${f}.mp4`, caption, likes: 1800 + i * 640, comments: 40 + i * 23,
}));
