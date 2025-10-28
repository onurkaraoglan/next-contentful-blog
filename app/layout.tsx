import "@onur/styles/globals.css";
import "@onur/styles/prism.css";
import { ThemeProvider } from "next-themes";
import { DockContainer } from "@onur/components/navigation/dock-container";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Onur Karaoğlan",
    template: "%s | Onur Karaoğlan",
  },
  description: "Onur Karaoğlan - Full Stack Developer - Blog",
  keywords: [
    "Onur",
    "Karaoğlan",
    "Onur Karaoğlan",
    "Software",
    "Full-Stack",
    "Engineer",
    "Developer",
    "Blog",
  ],
  authors: [{ name: "Onur Karaoğlan" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-background pb-32">
            <main>{children}</main>
            <DockContainer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

