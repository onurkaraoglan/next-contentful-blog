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
    description:
      "At Fill Software, I work as a full-stack engineer contributing to both the **frontend**, **backend** and **mobile development** of international products across different markets including Costa Rica, Japan, Georgia and Turkey. My work spans building **scalable backend services**, designing **modular UI systems**, improving **architecture** and ensuring **code quality** through reviews and mentoring. I collaborate **closely with designers**, **product managers** and **cross-functional teams** to deliver seamless user experiences.",
    bullets: [
      "**Nedwork** (Turkey): Built an **AI-powered** recruitment platform enabling automated CV and keyword parsing, quiz scoring, character evaluation and score-based filtering. Developed **employer**, **admin**, **instructor** and **candidate** panels.",
      "**T100 Loyalty** (Georgia): Developed a full loyalty and rewards platform including **backend services**, **admin panel**, **company dashboard** and **mobile app**. Integrated complex loyalty workflows and business rules.",
      "**sincap-common** (Turkey): Designed an internal Golang CRUD framework using Fiber and GORM, providing built-in **filtering**, **sorting**, **pagination** and **multi-language JSON field handling**.",
      "**Yuppi** (Turkey): Architected the **entire backend and admin panel from scratch** and developed a **cross-platform mobile application (iOS & Android)** using React Native and Expo. Implemented **OTP flows**, **subscription infrastructure** and a **reusable component system**.",
      "**Planet.Surf** (Costa Rica): Built **modular UI components** and shared **admin interfaces**, designed **RESTful backend services** and ensured **performance and consistency** across the platform. Worked on both web and backend layers using Next.js, TypeScript, Golang and PostgreSQL.",
      "**ByFood** (Japan): Improved internal admin platform by developing **reusable components** and refactoring **REST API integrations**. Enhanced backend reliability and optimized data workflows for high-traffic restaurant and experience listings.",
      "**Dependi.io** (Turkey): Extended a widely used **Rust** dependency extension **(1M+ installs)** to support  **Go**, **JavaScript**, **TypeScript**, **Python**, **PHP**, **Dart** and **C#** environments. Designed and implemented a client–server **caching mechanism** reducing resolution time to **~6ms**, significantly improving developer experience.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "Golang",
      "MySQL",
      "PostgreSQL"
    ],
    logoSrc: "/images/logo/fill-labs.png"
  },
  {
    id: "work-hidoctor-1",
    roleOrDegree: "Front-End Engineer",
    organization: "HiDoctor Health Services",
    location: "Istanbul, Turkey",
    startDate: "04/2022",
    endDate: "11/2022",
    description:
      "At HiDoctor, I worked primarily on **modernizing the frontend architecture** by migrating the legacy React project to Next.js. I collaborated **closely with designers** to ensure pixel-perfect UI/UX alignment while **helping junior developers** improve their frontend skills.",
    bullets: [
      "**HiDoctor** (Turkey): Contributed to the online consultancy platform featuring real-time video and audio calls. Rebuilt responsive UI components, improved layout consistency and helped transition the entire system into a more maintainable Next.js codebase."
    ],
    tech: ["Next.js", "React", "TypeScript"],
    logoSrc: "/images/logo/hidoctor.jpeg"
  },
  {
    id: "work-surteks-1",
    roleOrDegree: "Full Stack Software Engineer",
    organization: "Surteks Automotive Industry",
    location: "Istanbul, Turkey",
    startDate: "04/2015",
    endDate: "04/2022",
    description:
      "Worked on IoT, automation and B2B platforms, collaborating with embedded teams to process real-time device data at scale. Delivered end-to-end features involving frontend, backend, cloud services and device-level communication. Built systems used by thousands of users and handled millions of data points.",
    bullets: [
      "**Enfessa** (Turkey): Managed a large-scale IoT platform integrating **650+ connected devices** and processing **over 35 million data messages**. Developed **real-time analytics features**, **automated invoicing** and a **custom per-device password generation algorithm** to enhance security.",
      "**Automyst** (Turkey): Developed a B2B vehicle sales tracking platform used by **1.5k+ users**. Designed and optimized workflows that processed **7.5k+ invoices** and **over 440k transactions** . Improved system reliability and data integrity with modernized backend services."
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
      "MSSQL"
    ],
    logoSrc: "/images/logo/surteks.jpg"
  }
];


export const educationHistory: ResumeWork[] = [
  {
    id: "edu-1",
    roleOrDegree: "B.Sc. Computer Engineering",
    organization: "Çukurova University",
    location: "Adana, Turkey",
    startDate: "2009",
    endDate: "2013",
    description:
      "Completed a Bachelor of Science in Computer Engineering with a focus on software engineering, algorithms, distributed systems and network programming. Gained hands-on experience through academic projects involving system design and web development.",
    bullets: [
      "Focused on software engineering, distributed systems and data structures.",
      "Completed multiple hands-on programming projects using C, C++, Java and SQL.",
      "Actively participated in engineering events and seminars related to computer science technologies."
    ],
    tech: [],
    logoSrc: "/images/logo/cukurova-university.png"
  }
];


