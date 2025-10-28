export type ResumeWork = {
  id: string;
  roleOrDegree: string;
  organization: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  bullets?: string[];
  tech?: string[];
  logoSrc?: string;
};

export const workExperiences: ResumeWork[] = [
  {
    id: "work-fill-1",
    roleOrDegree: "Full-Stack Software Engineer",
    organization: "Fill Software and Consulting Services Corp.",
    location: "Istanbul, Turkey",
    startDate: "11/2022",
    endDate: "Present",
    description: "Worked on multiple products as a **full‑stack engineer** across web and mobile. Collaborated with designers, mentored juniors, and ensured code quality via reviews.",
    bullets: [
      "**Planet.Surf (Costa Rica)** – Built modular admin and responsive app; implemented shared backend REST services.",
      "**ByFood (Japan)** – Created reusable components for admin and desktop apps; maintained backend REST services.",
      "**Yuppi (Turkey)** – Set up backend and admin from scratch; shipped iOS/Android app with OTP and subscriptions.",
      "**Dependi.io (Turkey)** – Extended a popular Rust extension to support JS/Go/Python; added client–server caching to cut processing to ~6ms.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "Golang",
      "MySQL",
      "PostgreSQL",
    ],
    logoSrc: "/images/logo/fill-labs.png",
  },
  {
    id: "work-hidoctor-1",
    roleOrDegree: "Front-End Engineer",
    organization: "HiDoctor Health Services",
    location: "Istanbul, Turkey",
    startDate: "04/2022",
    endDate: "11/2022",
    description: "Migrated legacy React app to **Next.js**, collaborated closely with design, and mentored juniors.",
    bullets: [
      "**HiDoctor** – Online consultancy platform with video/audio calls; implemented reusable components and responsive UI.",
    ],
    tech: ["Next.js", "React", "TypeScript"],
    logoSrc: "/images/logo/hidoctor.jpeg",
  },
  {
    id: "work-surteks-1",
    roleOrDegree: "Full Stack Software Engineer",
    organization: "Surteks Automotive Industry",
    location: "Istanbul, Turkey",
    startDate: "04/2015",
    endDate: "04/2022",
    description: "Built **IoT** and **B2B** platforms; collaborated with embedded engineers on device communication.",
    bullets: [
      "**Enfessa** – Managed IoT platform for 650+ devices; processed 35M+ messages with analytics and automated invoicing; built per‑device password generator algorithm.",
      "**Automyst** – B2B sales tracking platform processing 7.5k+ invoices and 440k+ transactions for 1.5k+ users.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Golang",
      "MySQL",
      "C#",
      "C",
      "AngularJS",
      "ASP.NET MVC",
      "MSSQL",
    ],
    logoSrc: "/images/logo/surteks.jpg",
  },
];

export const educationHistory: ResumeWork[] = [
  {
    id: "edu-1",
    roleOrDegree: "B.Sc. Computer Engineering",
    organization: "Çukurova University",
    location: "Adana, TR",
    startDate: "2009",
    endDate: "2013",
    bullets: [
      "Focus on software engineering and distributed systems",
    ],
    logoSrc: "/images/logo/cukurova-university.png",
  },
];

