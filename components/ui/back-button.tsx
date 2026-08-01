"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// SVG Filter for liquid glass effect
function LiquidGlassFilter() {
  return (
    <svg style={{ display: "none", position: "absolute" }}>
      <defs>
        <filter id="back-button-glass" x="0%" y="0%" width="100%" height="100%">
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
      </defs>
    </svg>
  );
}

export function BackButton() {
  const router = useRouter();

  return (
    <>
      <LiquidGlassFilter />
      <button
        onClick={() => router.back()}
        className="group fixed top-6 left-6 md:left-10 z-50 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/78 px-4 py-2.5 text-foreground shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-[0_18px_48px_rgba(0,0,0,0.2)] supports-[backdrop-filter]:bg-background/62 dark:shadow-[0_14px_44px_rgba(0,0,0,0.55)]"
      >
        {/* Liquid glass distortion layer */}
        <div
          className="absolute -z-10 inset-0 rounded-xl overflow-hidden"
          style={{
            backdropFilter: "blur(14px)",
            filter: "url(#back-button-glass)",
            isolation: "isolate",
          }}
        />
        
        {/* Inner highlight/rim light effect */}
        <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_2px_2px_0px_-2px_rgba(0,0,0,0.25),_inset_0_0_3px_1px_rgba(0,0,0,0.25)] dark:shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),_inset_0_0_3px_1px_rgba(255,255,255,0.7)]" />

        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" />
        <span className="text-sm font-medium relative z-10 hidden md:inline">Back</span>
      </button>
    </>
  );
}
