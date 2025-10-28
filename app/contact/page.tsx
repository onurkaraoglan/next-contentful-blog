import Link from "next/link";
import { Card, CardContent } from "@onur/components/ui/card";
import {
  Linkedin,
  Medium,
  Twitter,
  Github,
  Envelope,
} from "react-bootstrap-icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Onur Karaoğlan - Find me on LinkedIn, GitHub, Medium or Twitter.",
};

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 md:py-20">
      <div className="container mx-auto px-8 max-w-4xl">
      <div className="flex flex-col items-center justify-center gap-3 mb-16">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 relative bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)]">
          Let's Connect
        </h1>
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          Feel free to reach out through any of these platforms
        </p>
      </div>

      <div className="relative mb-12">
        <Card className="relative bg-background border-none">
          <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
          <CardContent className="relative p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
              Social Media
            </h2>
            <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap md:justify-center gap-4 max-w-md mx-auto">
              <Link
                href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border-1 border-black dark:border-white hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-8 h-8 md:w-10 md:h-10 fill-black dark:fill-white group-hover:fill-blue-500 dark:group-hover:fill-blue-400 transition-colors" />
              </Link>
              
              <Link
                href="https://github.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border-1 border-black dark:border-white hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-8 h-8 md:w-10 md:h-10 fill-black dark:fill-white group-hover:fill-purple-500 dark:group-hover:fill-purple-400 transition-colors" />
              </Link>
              
              <Link
                href="https://medium.com/@onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border-1 border-black dark:border-white hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:scale-110"
              >
                <Medium className="w-8 h-8 md:w-10 md:h-10 fill-black dark:fill-white group-hover:fill-green-500 dark:group-hover:fill-green-400 transition-colors" />
              </Link>
              
              <Link
                href="https://twitter.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border-1 border-black dark:border-white hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-8 h-8 md:w-10 md:h-10 fill-black dark:fill-white group-hover:fill-cyan-500 dark:group-hover:fill-cyan-400 transition-colors" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Card className="relative bg-background border-none">
          <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>

          <CardContent className="relative p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Envelope className="w-7 h-7 fill-black dark:fill-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Email Me
                </h2>
                <p className="text-muted-foreground mb-4">
                  Prefer email? Drop me a message directly
                </p>
                <Link
                  href="mailto:okaraoglan91@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-medium hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  okaraoglan91@gmail.com
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

