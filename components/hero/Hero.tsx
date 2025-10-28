"use client";

import { HeroTitle } from "./HeroTitle";
import { HeroProfileCard } from "./HeroProfileCard";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-background">
      <div className="absolute inset-0 bg-dot-black/[0.3] dark:bg-dot-white/[0.25] [background-size:16px_16px] animate-twinkle mix-blend-multiply dark:mix-blend-plus-lighter"></div>
      <div className="container flex flex-col items-center gap-8 lg:flex-row lg:gap-16 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <HeroTitle />
        <HeroProfileCard />
      </div>
      <div className="absolute bottom-24 md:bottom-32 left-0 right-0 flex justify-center z-50">
        <motion.button
          onClick={scrollToContent}
          className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 md:h-10 md:w-10" />
        </motion.button>
      </div>
    </section>
  );
}

