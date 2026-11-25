// Navigation sections
export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// Project details reflect the supplied portfolio assets and the linked source repositories.
export const projects = [
  {
    id: 'tera',
    title: 'Tera',
    tagline: 'Taxi Queue Management System',
    category: 'Mobile Application',
    description:
      'A cross-platform taxi queue management application designed to organize passenger queues, automate driver assignments, and improve station operations through real-time synchronization and role-based interfaces.',
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Riverpod'],
    github: 'https://github.com/abelnegatu1308/tera-app',
    live: null,
    screenshot: '/project-1.webp',
  },
  {
    id: 'tourist-guide',
    title: 'Tourist Guide',
    tagline: 'Travel Discovery Platform',
    category: 'Web Application',
    description:
      'A travel discovery platform designed to help users explore destinations, discover attractions, and organize memorable travel experiences through an engaging digital interface.',
    tech: ['React', 'JavaScript', 'Vite', 'CSS'],
    github: null,
    live: 'https://tourist-guide-neon.vercel.app',
    screenshot: '/project-2.webp',
  },
  {
    id: 'addis-eats',
    title: 'Addis Eats',
    tagline: 'Ethiopian Food Ordering Platform',
    category: 'Full-Stack Web Application',
    description:
      'A modern Ethiopian food ordering platform that brings traditional Ethiopian cuisine online. Users can explore dishes, browse categorized menus, manage shopping carts, and place food orders through a responsive interface.',
    tech: ['Next.js', 'React', 'JavaScript', 'Tailwind CSS', 'Neon PostgreSQL'],
    github: 'https://github.com/abelnegatu1308/addis-eats',
    live: 'https://addis-eats-cxyu.vercel.app',
    screenshot: '/project-3.webp',
  },
  {
    id: 'shegger-wheels',
    title: 'Sheger Wheels',
    tagline: 'Car Rental Marketplace',
    category: 'Web Application',
    description:
      'A responsive, frontend-only car-rental demo for Addis Ababa, with renter, owner, and administrator experiences. Browser storage stands in for a backend.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'Browser Storage'],
    github: 'https://github.com/abelnegatu1308/shegger-wheels',
    live: 'https://shegger-wheels-ten.vercel.app',
    screenshot: '/project-4.webp',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    tagline: 'Property Website',
    category: 'Web Application',
    description:
      'A property-management and real-estate website with property listings, search, favorites, user accounts, and an administrator dashboard.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    github: 'https://github.com/abelnegatu1308/RealEstate-Website-PHP',
    live: null,
    screenshot: '/project-5.webp',
  },
];

// Education & Certifications
export const education = [
  {
    id: 'bsse',
    title: 'BSc in Software Engineering',
    institution: 'Addis Ababa Science and Technology University (AASTU)',
    year: '2026',
    type: 'Education',
  },
  {
    id: 'advanced-digital',
    title: 'Advanced Digital Skills Certificate',
    institution: 'IBT College',
    year: '2026',
    type: 'Certification',
    sub: 'Software Development',
  },
];

// Contact information
export const contact = {
  email: 'abelnegatu1308@gmail.com',
  location: 'Addis Ababa, Ethiopia',
  github: 'https://github.com/abelnegatu1308',
};

export const about = {
  position: 'Software Engineer',
  summary: 'Full-Stack & Mobile Developer',
  location: contact.location,
  education: {
    edu: education[0].institution,
    year: education[0].year,
  },
  stats: [
    { value: String(projects.length).padStart(2, '0'), label: 'Featured projects' },
    { value: 'Web + mobile', label: 'Development focus' },
    { value: 'Addis Ababa', label: 'Based in' },
  ],
};

// Skills data organized by category
export const skills = [
  {
    category: 'Programming Languages',
    skills: ['JavaScript', 'C++', 'Java', 'Python', 'PHP', 'SQL'],
  },
  {
    category: 'Frontend Development',
    skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Responsive Web Design', 'State Management'],
  },
  {
    category: 'Mobile Development',
    skills: ['Flutter', 'Dart'],
  },
  {
    category: 'Backend & Database',
    skills: ['Firebase', 'Firestore', 'Authentication', 'RESTful APIs', 'Relational SQL'],
  },
  {
    category: 'Developer Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Agile Development'],
  },
];
