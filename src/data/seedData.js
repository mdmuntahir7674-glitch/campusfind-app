export const SEED_ITEMS = [
  {
    id: "item-1",
    title: "MacBook Air M2 (Midnight)",
    type: "lost", // 'lost' | 'found'
    category: "Electronics",
    description: "Left on table 14 near the second-floor quiet study area. It is in an olive green hard shell case with a GitHub Octocat sticker on the lid.",
    location: "Central Library — Floor 2",
    date: "2026-11-04",
    time: "10:30 AM",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    status: "open", // 'open' | 'claimed' | 'resolved'
    reportedBy: {
      name: "Tariq Rahman",
      email: "t.rahman@campus.edu",
      phone: "+1 (555) 234-8910",
      role: "Student (Computer Science)"
    },
    isUserReport: false
  },
  {
    id: "item-2",
    title: "Sony WH-1000XM5 Headphones",
    type: "found",
    category: "Audio",
    description: "Found resting on the cafeteria bench near the south recycling station. Black color, stored inside the official magnetic zip carrying pouch.",
    location: "Student Union Cafeteria",
    date: "2026-11-05",
    time: "02:15 PM",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
    status: "open",
    reportedBy: {
      name: "Elena Rostova",
      email: "elena.r@campus.edu",
      phone: "+1 (555) 891-4432",
      role: "Campus Facility Staff"
    },
    isUserReport: false
  },
  {
    id: "item-3",
    title: "Dorm Keyring with Brass Fob",
    type: "found",
    category: "Keys",
    description: "Set of three physical dorm room keys with an engraved brass tag reading 'North Quad - 402' and a red carabiner clip.",
    location: "Engineering Hall — West Corridor",
    date: "2026-11-04",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80",
    status: "open",
    reportedBy: {
      name: "Marcus Vance",
      email: "m.vance@campus.edu",
      phone: "+1 (555) 345-6712",
      role: "Student (Mechanical Eng)"
    },
    isUserReport: false
  },
  {
    id: "item-4",
    title: "Black Matte Hydro Flask (32oz)",
    type: "lost",
    category: "Accessories",
    description: "Matte black bottle with dented base and multiple national park stickers. Left in the auditorium cup holder during Physics 201 lecture.",
    location: "Science Lecture Hall A",
    date: "2026-11-03",
    time: "04:45 PM",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80",
    status: "open",
    reportedBy: {
      name: "Chloe Chen",
      email: "c.chen@campus.edu",
      phone: "+1 (555) 782-9901",
      role: "Student (Biochemistry)"
    },
    isUserReport: false
  },
  {
    id: "item-5",
    title: "Brown Leather Fossil Bi-fold Wallet",
    type: "found",
    category: "Personal Items",
    description: "Contains campus meal pass and driver's license. Handed over to the front desk after being discovered by the cardio machines.",
    location: "Campus Recreation & Fitness Center",
    date: "2026-11-05",
    time: "08:15 AM",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
    status: "open",
    reportedBy: {
      name: "Front Desk Staff",
      email: "recsports@campus.edu",
      phone: "+1 (555) 902-1144",
      role: "Student Desk Assistant"
    },
    isUserReport: false
  },
  {
    id: "item-6",
    title: "Graphing Calculator TI-84 Plus CE",
    type: "lost",
    category: "Stationery",
    description: "Translucent teal casing with hand-written silver sharpie initials 'N.K.' on the underside battery cover.",
    location: "Mathematics Hall — Lab 3B",
    date: "2026-11-02",
    time: "01:20 PM",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80",
    status: "claimed",
    reportedBy: {
      name: "Nadia Khan",
      email: "n.khan@campus.edu",
      phone: "+1 (555) 431-7782",
      role: "Student (Data Science)"
    },
    isUserReport: false
  },
  {
    id: "item-7",
    title: "Patagonia Torrentshell Rain Jacket",
    type: "found",
    category: "Clothing",
    description: "Men's medium size, navy blue and mustard trim. Draped over the back of the computer station in the design print studio.",
    location: "Arts & Architecture Quad — Studio 12",
    date: "2026-11-01",
    time: "06:00 PM",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    status: "resolved",
    reportedBy: {
      name: "Julian Rivera",
      email: "j.rivera@campus.edu",
      phone: "+1 (555) 601-3829",
      role: "Studio Monitor"
    },
    isUserReport: false
  },
  {
    id: "item-8",
    title: "Spiral Molecular Biology Notebook",
    type: "lost",
    category: "Stationery",
    description: "Black 5-subject Five Star notebook with dense handwritten lecture diagrams and midterm review outlines for Bio 302.",
    location: "Department of Life Sciences Corridor",
    date: "2026-11-03",
    time: "11:45 AM",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    status: "open",
    reportedBy: {
      name: "David Kim",
      email: "d.kim@campus.edu",
      phone: "+1 (555) 912-3044",
      role: "Student (Pre-Med)"
    },
    isUserReport: true
  }
];

export const CATEGORIES = [
  "All",
  "Electronics",
  "Audio",
  "Keys",
  "Personal Items",
  "Accessories",
  "Stationery",
  "Clothing",
  "Other"
];

export const CAMPUS_LOCATIONS = [
  "All Locations",
  "Central Library",
  "Student Union Cafeteria",
  "Engineering Hall",
  "Science Lecture Hall A",
  "Campus Recreation & Fitness Center",
  "Mathematics Hall",
  "Arts & Architecture Quad",
  "Department of Life Sciences Corridor"
];