"use client";

import { Dock } from "@onur/components/navigation/dock";
import { Home, User, BookOpen, Briefcase, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function DockContainer() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [openApps, setOpenApps] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update active apps based on current route
    const currentPath = pathname.substring(1) || "home";
    setOpenApps([currentPath]);
  }, [pathname]);

  const apps = [
    {
      id: "home",
      name: "Home",
      icon: <Home className="h-5 w-5 " />,
    },
    {
      id: "about",
      name: "About",
      icon: <User className="h-5 w-5 " />,
    },
    {
      id: "blog",
      name: "Blog",
      icon: <BookOpen className="h-5 w-5 " />,
    },
    {
      id: "projects",
      name: "Projects",
      icon: <Briefcase className="h-5 w-5 " />,
    },
    {
      id: "contact",
      name: "Contact",
      icon: <Mail className="h-5 w-5 " />,
    },
    {
      id: "theme",
      name: "Theme",
      icon: !mounted ? (
        <Sun className="h-5 w-5 " />
      ) : theme === "light" ? (
        <Moon className="h-5 w-5 " />
      ) : (
        <Sun className="h-5 w-5 " />
      ),
    },
  ];

  const handleAppClick = (appId: string) => {
    if (appId === "theme") {
      setTheme(theme === "light" ? "dark" : "light");
    } else {
      const path = appId === "home" ? "/" : `/${appId}`;
      router.push(path);
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center">
      <Dock apps={apps} onAppClick={handleAppClick} openApps={openApps} />
    </div>
  );
}
