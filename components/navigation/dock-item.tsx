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

  const baseSize = isMobile ? 40 : 48;
  
  // Only calculate animations for desktop
  const distance = useMotionValue(9999);
  const widthSync = useTransform(
    distance,
    [-150, -100, 0, 100, 150],
    [baseSize, baseSize, baseSize * 1.5, baseSize, baseSize]
  );

  const width = useSpring(widthSync, {
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
    if (Math.abs(distanceFromMouse) > 150 || mouseX === 9999) {
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
          className={cn(
            "relative w-full h-full rounded-full flex items-center justify-center cursor-pointer",
            "p-2 transition-all duration-200 z-0 outline-none border-none bg-transparent/10"
          )}
        >
          {/* Inner highlight */}
          <div
            className={cn("absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)] dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]", isOpen ? "bg-[rgb(0_0_0_/_0.2)] dark:bg-[rgb(255_255_255_/_0.3)]" : "bg-transparent")}
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
            <div className="w-8 h-8 flex items-center justify-center relative z-10">
              {app.icon}
            </div>
          )}
        </button>
      </div>
    );
  }

  // Desktop version with animations
  return (
    <motion.div ref={ref} style={{ width }} className="relative group isolate">
      <button
        onClick={onClick}
        style={{ height: baseSize }}
        className={cn(
          "relative w-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
          "p-2 z-0 outline-none border-none bg-transparent"
        )}
      >
        {/* Inner highlight/rim light */}
        <div
          className={cn(
            "absolute inset-1 z-0 overflow-hidden rounded-full pointer-events-none transition-all duration-300",
            "shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)]",
            "dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]",
            isOpen
              ? "bg-[rgb(0_0_0_/_0.2)] dark:bg-[rgb(255_255_255_/_0.3)]"
              : "bg-transparent"
          )}
        />


        {/* Liquid glass distortion layer */}
        <div
          className="absolute -z-10 inset-1 rounded-full overflow-hidden"
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
            className="w-8 h-8 md:w-9 md:h-9 object-contain relative z-10"
          />
        ) : (
          <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center relative z-10">
            {app.icon}
          </div>
        )}
      </button>

      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-xs font-medium isolate"
        style={{
          backgroundColor: "rgb(0 0 0 / 80%)",
          color: "white",
        }}
      >
        {app.name}
      </div>
    </motion.div>
  );
}