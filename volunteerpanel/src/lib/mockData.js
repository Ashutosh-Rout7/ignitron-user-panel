export const students = Array.from({ length: 42 }).map((_, i) => {
  const firstNames = [
    "Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Ayaan",
    "Krishna","Ishaan","Diya","Ananya","Aadhya","Saanvi","Pari","Myra",
    "Anika","Navya","Riya","Aarohi","Kiara","Tara","Zara","Ira"
  ];

  const lastNames = [
    "Sharma","Verma","Patel","Reddy","Iyer","Nair","Khan","Singh",
    "Gupta","Mehta","Joshi","Bose","Das","Roy","Pillai"
  ];

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Information Technology",
    "AI & Data Science",
    "Electrical"
  ];

  const degrees = ["B.Tech", "M.Tech", "BCA", "MCA"];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const statuses = ["Active", "Verified", "Inactive", "Active", "Active", "Verified"];

  function rand(arr, idx) {
    return arr[idx % arr.length];
  }

  const fn = rand(firstNames, i * 3 + 1);
  const ln = rand(lastNames, i * 7 + 2);

  const name = `${fn} ${ln}`;
  const regNo = `IGN${2024000 + i + 1}`;

  return {
    id: String(i + 1),
    name,
    regNo,
    department: rand(departments, i + 1),
    degree: rand(degrees, i + 2),
    year: rand(years, i + 3),
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@ignitron.edu`,
    phone: `+91 9${String(800000000 + i * 7919).slice(0, 9)}`,
    attendance: 60 + ((i * 13) % 40),
    status: rand(statuses, i),
    photo: `https://i.pravatar.cc/200?img=${(i % 70) + 1}`,
    registeredAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

export const notifications = [
  {
    id: 1,
    type: "event",
    title: "Event Reminder",
    message: "Ignitron Tech Fest kicks off tomorrow at 9 AM.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "admin",
    title: "Admin Announcement",
    message: "New volunteer guidelines published.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    type: "task",
    title: "Volunteer Task Update",
    message: "You've been assigned to Hall B registration desk.",
    time: "3h ago",
    unread: true,
  },
  {
    id: 4,
    type: "event",
    title: "Event Reminder",
    message: "Workshop briefing at 4 PM today.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "task",
    title: "Volunteer Task Update",
    message: "Attendance verification completed for 24 students.",
    time: "2 days ago",
    unread: false,
  },
];

export const timeline = [
  {
    id: 1,
    title: "Student Search Completed",
    desc: "Fetched profile for IGN2024012",
    time: "Just now",
    color: "orange",
  },
  {
    id: 2,
    title: "Attendance Verified",
    desc: "23 students marked present at Hall A",
    time: "12 min ago",
    color: "green",
  },
  {
    id: 3,
    title: "Registration Approved",
    desc: "New batch of 8 students approved",
    time: "1 hour ago",
    color: "blue",
  },
  {
    id: 4,
    title: "Volunteer Assigned",
    desc: "Assigned to Tech Fest Day 2 desk",
    time: "3 hours ago",
    color: "purple",
  },
  {
    id: 5,
    title: "Profile Updated",
    desc: "Updated contact information",
    time: "Yesterday",
    color: "orange",
  },
];

export const currentVolunteer = {
  name: "Aarav Sharma",
  email: "aarav.sharma@ignitron.edu",
  department: "Computer Science",
  role: "Volunteer",
  photo: "https://i.pravatar.cc/200?img=12",
};