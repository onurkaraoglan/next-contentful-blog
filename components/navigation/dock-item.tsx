"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@onur/lib/utils";

interface App {
  id: string;
  name: string;
  icon: string | React.ReactNode;
}

interface DockItemProps {
  app: App;
  mouseX: number;
  dockBounds: { left: number; width: number };
  isOpen?: boolean;
  onClick?: () => void;
}

export function DockItem({
  app,
  mouseX,
  dockBounds,
  isOpen,
  onClick,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const baseSize = 36;
  
  // Only calculate animations for desktop
  const distance = useMotionValue(9999);
  const scaleSync = useTransform(
    distance,
    [-200, -100, 0, 100, 200],
    [1, 1.025, 1.08, 1.025, 1]
  );
  const ySync = useTransform(
    distance,
    [-200, -100, 0, 100, 200],
    [0, -1, -5, -1, 0]
  );
  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip all animation calculations for mobile
    if (isMobile) return;
    
    const el = ref.current;
    if (!el || !dockBounds.width) {
      distance.set(9999);
      return;
    }

    const rect = el.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2 - dockBounds.left;
    const distanceFromMouse = mouseX - itemCenterX;
    
    // If mouse is far away or mouseX is our special "reset" value (9999), set distance to max
    if (Math.abs(distanceFromMouse) > 200 || mouseX === 9999) {
      distance.set(9999);
    } else {
      distance.set(distanceFromMouse);
    }
  }, [mouseX, dockBounds, distance, isMobile]);

  if (isMobile) {
    // Static mobile version with no animations
    return (
      <div 
        style={{ width: baseSize, height: baseSize }}
        className="relative isolate"
      >
        <button
          onClick={onClick}
          aria-label={app.name}
          aria-current={isOpen ? "page" : undefined}
          title={app.name}
          className={cn(
            "relative w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer",
            "p-2 transition-all duration-200 z-0 outline-none border",
            isOpen
              ? "border-foreground bg-foreground text-background"
              : "border-transparent bg-transparent/10 text-foreground"
          )}
        >
          {/* Inner highlight */}
          <div
            className={cn("absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)] dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]", isOpen ? "bg-background/10" : "bg-transparent")}
          />

          {/* Liquid glass layer */}
          <div
            className="absolute -z-10 inset-0 rounded-full overflow-hidden"
            style={{
              backdropFilter: "blur(2px)",
              filter: "url(#dock-item-glass)",
              isolation: "isolate",
            }}
          />

          {typeof app.icon === "string" ? (
            <img
              src={app.icon}
              alt={app.name}
              className="w-8 h-8 object-contain relative z-10"
            />
          ) : (
            <div className="w-7 h-7 flex items-center justify-center relative z-10">
              {app.icon}
            </div>
          )}
        </button>
      </div>
    );
  }

  // Desktop version with animations
  return (
    <motion.div ref={ref} style={{ scale, y }} className="relative isolate">
      <button
        onClick={onClick}
        aria-label={app.name}
        aria-current={isOpen ? "page" : undefined}
        className={cn(
          "relative flex h-14 min-w-[4.75rem] flex-col items-center justify-center gap-1 rounded-2xl px-2 cursor-pointer transition-all duration-300",
          "z-0 outline-none border",
          isOpen
            ? "border-foreground bg-foreground text-background shadow-[0_8px_24px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
            : "border-transparent bg-transparent text-muted-foreground hover:border-border/70 hover:bg-background/35 hover:text-foreground"
        )}
      >
        {/* Inner highlight/rim light */}
        <div
          className={cn(
            "absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none transition-all duration-300",
            "shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)]",
            "dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]",
            isOpen ? "bg-background/10" : "bg-transparent"
          )}
        />


        {/* Liquid glass distortion layer */}
        <div
          className="absolute -z-10 inset-0 rounded-2xl overflow-hidden"
          style={{
            backdropFilter: "blur(2px)",
            filter: "url(#dock-item-glass)",
            isolation: "isolate",
          }}
        />

        {typeof app.icon === "string" ? (
          <img
            src={app.icon}
            alt={app.name}
            className="h-5 w-5 object-contain relative z-10"
          />
        ) : (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center relative z-10">
            {app.icon}
          </div>
        )}
        <span className="relative z-10 max-w-[4.25rem] truncate text-center text-[10px] font-medium leading-none">
          {app.name}
        </span>
      </button>
    </motion.div>
  );
}
