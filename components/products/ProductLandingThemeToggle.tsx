"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ProductLandingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/6 text-foreground transition-colors duration-200 hover:bg-foreground/12"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {!mounted ? (
        <Sun className="h-4 w-4" />
      ) : isLight ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
