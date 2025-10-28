"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@onur/lib/utils";
import { DockItem } from "./dock-item";

interface App {
  id: string;
  name: string;
  icon: string | React.ReactNode;
}

interface DockProps {
  apps: App[];
  onAppClick?: (appId: string) => void;
  openApps?: string[];
  className?: string;
}

// SVG Filters for liquid glass effect
function LiquidGlassFilters() {
  return (
    <svg style={{ display: "none", position: "absolute" }}>
      <defs>
        <filter id="dock-glass" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.006"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale="77"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="dock-item-glass" primitiveUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="42"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function Dock({
  apps,
  onAppClick,
  openApps = [],
  className,
}: DockProps) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [dockBounds, setDockBounds] = useState({ left: 0, width: 0 });
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    setMouseX(mouseX);
    setDockBounds({ left: rect.left, width: rect.width });
  };

  const handleMouseLeave = () => {
    setMouseX(9999); // Use a large number instead of Infinity
  };

  return (
    <>
      <LiquidGlassFilters />
      <motion.div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative mx-auto w-max h-[60px] md:h-[80px] p-2.5 md:p-3.5 flex gap-2.5 md:gap-2 rounded-2xl md:rounded-3xl",
          "isolate z-0",
          "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
          "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          "bg-white/10 dark:bg-black/20",
          className
        )}
      >
        {/* Liquid glass distortion layer */}
        <div
          className="absolute -z-10 inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            backdropFilter: "blur(0px)",
            filter: "url(#dock-glass)",
            isolation: "isolate",
          }}
        />

        {/* Inner highlight/rim light effect - using ::before pseudo for cleaner rendering */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)] dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]"
         
        />

        {apps.map((app) => (
          <DockItem
            key={app.id}
            app={app}
            mouseX={mouseX}
            dockBounds={dockBounds}
            isOpen={openApps.includes(app.id)}
            onClick={() => onAppClick?.(app.id)}
          />
        ))}
      </motion.div>
    </>
  );
}
