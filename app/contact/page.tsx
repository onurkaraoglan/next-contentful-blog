import Link from "next/link";
import { Card, CardContent } from "@onur/components/ui/card";
import {
  Linkedin,
  Medium,
  Github,
  Envelope,
} from "react-bootstrap-icons";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Onur Karaoğlan - Find me on LinkedIn, GitHub, Medium or Twitter.",
};

export default function Contact() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="mb-16 flex flex-col items-center justify-center gap-3">
          <h1 className="relative bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 bg-clip-text pb-2 text-center text-3xl font-bold text-transparent [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)] md:text-4xl lg:text-5xl">
            Let's Connect
          </h1>
          <p className="max-w-2xl text-center text-base font-light text-muted-foreground">
            Feel free to reach out through any of these platforms
          </p>
        </div>

        <div className="mb-8">
          <Card className="border-border/70 bg-background shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">
                Social Media
              </h2>
              <div className="mx-auto grid max-w-md grid-cols-3 justify-items-center gap-4 md:flex md:flex-wrap md:justify-center">
                <SocialLink
                  href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                  label="LinkedIn"
                  icon={<Linkedin className="h-8 w-8 fill-current md:h-9 md:w-9" />}
                />
                <SocialLink
                  href="https://github.com/onurkaraoglan"
                  label="GitHub"
                  icon={<Github className="h-8 w-8 fill-current md:h-9 md:w-9" />}
                />
                <SocialLink
                  href="https://medium.com/@onurkaraoglan"
                  label="Medium"
                  icon={<Medium className="h-8 w-8 fill-current md:h-9 md:w-9" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-border/70 bg-background shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md border bg-muted/40 text-foreground">
                  <Envelope className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold md:text-2xl">
                    Email Me
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Prefer email? Drop me a message directly
                  </p>
                  <Link
                    href="mailto:okaraoglan91@gmail.com"
                    className="inline-flex items-center justify-center rounded-md border border-border/70 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
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

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-16 w-16 items-center justify-center rounded-lg border border-border/70 bg-muted/20 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted hover:shadow-md md:h-20 md:w-20"
    >
      {icon}
    </Link>
  );
}
