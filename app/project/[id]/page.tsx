import Image from "next/image";
import {
  getProject,
  getProjects,
} from "@onur/data/api/project";
import slug from "slug";
import { slugify } from "@onur/lib/string";
import { getTagNameById } from "@onur/lib/tag";
import { getProjectTags } from "@onur/data/api/tag";
import type { Metadata } from "next";
import { BackButton } from "@onur/components/ui/back-button";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: `${slug(project.fields.title)}-${project.sys.id}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: paramId } = await params;
  const id = paramId.split("-").slice(-1)[0];
  const project = await getProject(id);

  return {
    title: `Projects - ${project.fields?.title}`,
    description: project.fields?.description,
  };
}

export default async function Project({ params }: Props) {
  const { id: paramId } = await params;
  const id = paramId.split("-").slice(-1)[0];
  const project = await getProject(id);
  const projectTags = await getProjectTags();

  const { file, description: imgDescription } =
    project.fields.image?.fields || {};
  const src = file ? `https:${file.url}` : "";

  const tags = project.metadata.tags?.map((tag) => {
    return getTagNameById(projectTags.items, tag.sys.id);
  });

  return (
    <div className="relative mx-auto max-w-6xl min-h-[calc(100vh-120px)] flex items-center my-8 mx-4 md:mx-auto px-8 md:px-0">
      <BackButton />
      <div className="relative rounded-3xl bg-background w-full py-8 h-full">
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)] rounded-3xl"></div>
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 pl-8 md:pl-0 pr-8 pt-16 pb-4">
          {src && (
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-[8px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-60"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={src}
                    alt={imgDescription || ""}
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "auto" }}
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center h-full">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text">
                {project.fields.title}
              </h1>

              <p className="text-base leading-relaxed mb-6 text-muted-foreground">
                {project.fields.description}
              </p>

              <div className="space-y-4">
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border">
                  <h2 className="text-sm font-semibold mb-2 text-foreground">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted border border-border"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border">
                  <h2 className="text-sm font-semibold mb-2 text-foreground">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {project.fields.techStack?.map((stack, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted "
                      >
                        <Image
                          src={`/images/tech/${slugify(stack)}.svg`}
                          alt={stack}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                          unoptimized={true}
                        />
                        <span>{stack}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {project.fields.url && (
                <a
                  href={project.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex group"
                >
                  <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative px-6 py-3 bg-background rounded-lg text-foreground font-medium">
                    Visit Website
                  </span>
                </a>
              )}
              {project.fields.appStoreUrl && (
                <a
                  href={project.fields.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex group"
                >
                  <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative px-6 py-3 bg-background rounded-lg text-foreground font-medium">
                    App Store
                  </span>
                </a>
              )}
              {project.fields.googlePlayUrl && (
                <a
                  href={project.fields.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex group"
                >
                  <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative px-6 py-3 bg-background rounded-lg text-foreground font-medium">
                    Google Play
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

