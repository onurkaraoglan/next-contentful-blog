import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@onur/components/ui/card";
import ResumeSection, {
  ResumeItem,
} from "@onur/components/resume/ResumeSection";
import {
  workExperiences,
  educationHistory,
} from "@onur/data/static/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Onur Karaoğlan - Full-stack software engineer with 10+ years of experience",
};

export const revalidate = 600;

export default function About() {
  const d = new Date();
  let year = d.getFullYear();

  const work: ResumeItem[] = workExperiences;
  const education: ResumeItem[] = educationHistory;

  const primaryTech = [
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "React Native",
    "Expo",
    "GoLang",
  ];

  const secondaryTech = [
    "AngularJS",
    ".Net MVC",
    "AWS",
    "DigitalOcean",
    "Azure DevOps",
  ];

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl space-y-20">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 relative bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)]">
          About Me
        </h1>
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          Full-Stack Software Engineer passionate about building exceptional
          digital experiences
        </p>
      </div>
      <div className="grid gap-8 px-4">
        <div className="relative">
          <Card className="relative bg-background border-none">
            <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>

            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💼</span>
                <span>Experience & Background</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                I am a full-stack software engineer with{" "}
                <span className="font-bold text-purple-500">
                  {year - 2015}+ years of experience
                </span>{" "}
                and a Bachelor's degree in Computer Science. I have hands-on
                experience using various technologies like JavaScript (ES6),
                TypeScript, React.js, React Native, Expo, and Golang to create
                and implement software applications.
              </p>
              <p>
                I use version control systems and CI/CD pipelines with my
                projects which run on cloud platforms like AWS, DigitalOcean,
                and Azure DevOps.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="relative">
          <Card className="relative bg-background border-none">
            <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span>Philosophy & Growth</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative text-base md:text-lg leading-relaxed">
              <p>
                I enjoy being challenged and engaging with projects that
                require me to work outside of my comfort and knowledge set.
                Continuing to learn new languages and development techniques is
                important to me, and I believe in delivering high-quality
                solutions that make a real impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Tech Stack
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">
              Primary Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
            {primaryTech.map((tech) => (
              <div key={tech} className="relative group">
                <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative px-6 py-3 rounded-lg bg-background">
                  <span className="font-medium text-sm md:text-base">
                    {tech}
                  </span>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-500">
              Also Familiar With
            </h3>
          <div className="flex flex-wrap gap-3">
            {secondaryTech.map((tech) => (
              <div
                key={tech}
                className="relative px-6 py-3 rounded-lg border-2 border-muted hover:border-cyan-500/50 overflow-hidden group transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-dot-black/[0.3] dark:bg-dot-white/[0.25] [background-size:16px_16px] animate-twinkle mix-blend-multiply dark:mix-blend-plus-lighter"></div>
                <div className="pointer-events-none absolute inset-0 bg-card group-hover:bg-accent"></div>
                <span className="relative font-medium text-sm md:text-base">
                  {tech}
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className="space-y-16">
        <ResumeSection
          heading={{ title: "Work Experience", subTitle: "Career journey" }}
          items={work}
        />
        <ResumeSection
          heading={{ title: "Education", subTitle: "Academic background" }}
          items={education}
        />
      </div>
      </div>
    </div>
  );
}

