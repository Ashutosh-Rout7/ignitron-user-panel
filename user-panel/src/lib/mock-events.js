// events.js

export const events = [
  {
    id: "e1",
    name: "CodeStorm 48",
    category: "Hackathon",
    description:
      "A 48-hour build sprint where teams ship real products judged by founders.",
    date: "Feb 14 — 16",
    venue: "Innovation Hub",
    emoji: "💻",
    gradient: "from-orange-500/30 to-purple-500/30",
  },
  {
    id: "e2",
    name: "Pitch Arena",
    category: "Startup",
    description:
      "Pitch your idea to a panel of investors. Top 3 win seed grants.",
    date: "Feb 15",
    venue: "Auditorium A",
    emoji: "🚀",
    gradient: "from-purple-500/30 to-pink-500/30",
  },
  {
    id: "e3",
    name: "Design Royale",
    category: "Design",
    description:
      "Brand a fictional product in 6 hours. Live judging by Figma designers.",
    date: "Feb 14",
    venue: "Studio 2",
    emoji: "🎨",
    gradient: "from-fuchsia-500/30 to-orange-500/30",
  },
  {
    id: "e4",
    name: "AI Conclave",
    category: "Talk",
    description:
      "Keynotes from researchers building the next wave of foundation models.",
    date: "Feb 16",
    venue: "Main Stage",
    emoji: "🧠",
    gradient: "from-orange-400/30 to-violet-500/30",
  },
  {
    id: "e5",
    name: "Robowars",
    category: "Engineering",
    description:
      "Combat robots clash in a steel arena. Last bot standing takes the cup.",
    date: "Feb 15",
    venue: "Arena Block",
    emoji: "🤖",
    gradient: "from-amber-500/30 to-purple-600/30",
  },
  {
    id: "e6",
    name: "Quiz Quotient",
    category: "Quiz",
    description:
      "Open category quiz across tech, business and pop-culture. Solo or duo.",
    date: "Feb 14",
    venue: "Hall C",
    emoji: "🧩",
    gradient: "from-purple-500/30 to-orange-400/30",
  },
  {
    id: "e7",
    name: "Synthwave Night",
    category: "Concert",
    description:
      "Headline DJs, lasers, and a 4000-capacity open ground.",
    date: "Feb 15",
    venue: "Open Grounds",
    emoji: "🎧",
    gradient: "from-pink-500/30 to-indigo-500/30",
  },
  {
    id: "e8",
    name: "Capture The Flag",
    category: "Cybersec",
    description:
      "Jeopardy-style CTF with web, pwn, crypto and forensics tracks.",
    date: "Feb 16",
    venue: "Lab 4",
    emoji: "🛡️",
    gradient: "from-emerald-400/30 to-purple-500/30",
  },
  {
    id: "e9",
    name: "Founders Mixer",
    category: "Networking",
    description:
      "Curated rooms with founders, recruiters and student builders.",
    date: "Feb 16",
    venue: "Rooftop Lounge",
    emoji: "🤝",
    gradient: "from-orange-500/30 to-fuchsia-500/30",
  },
  {
    id: "e10",
    name: "Film Frames",
    category: "Creative",
    description:
      "Shoot, edit and screen a 3-minute short in under 24 hours.",
    date: "Feb 14 — 15",
    venue: "Media Block",
    emoji: "🎬",
    gradient: "from-rose-500/30 to-purple-500/30",
  },
  {
    id: "e11",
    name: "Esports Open",
    category: "Gaming",
    description:
      "Valorant + BGMI tournaments with cash prize pools.",
    date: "Feb 15 — 16",
    venue: "Gaming Arena",
    emoji: "🎮",
    gradient: "from-purple-600/30 to-orange-500/30",
  },
  {
    id: "e12",
    name: "Maker Expo",
    category: "Exhibition",
    description:
      "Walk-through showcase of student-built hardware, drones and IoT.",
    date: "Feb 14 — 16",
    venue: "Expo Hall",
    emoji: "⚙️",
    gradient: "from-amber-400/30 to-violet-600/30",
  },
];

export function getEventById(id) {
  return events.find((e) => e.id === id);
}