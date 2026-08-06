import type { Project } from "@onur/data/api/project";
import type { Tag } from "@onur/data/api/tag";
import ProjectCard from "@onur/components/ProjectCard";
import { cn } from "@onur/lib/utils";

export default function ProjectGrid({
  projects,
  tags,
  mobileScrollable = false,
}: {
  projects: Project[];
  tags: Tag;
  mobileScrollable?: boolean;
}) {
  return (
    <div
      className={cn(
        "gap-6",
        mobileScrollable
          ? "flex items-stretch snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:auto-rows-fr md:grid-cols-3 md:snap-none md:overflow-visible"
          : "grid auto-rows-fr grid-cols-1 md:grid-cols-3"
      )}
    >
      {mobileScrollable && <div aria-hidden="true" className="w-4 snap-none md:hidden" />}
      {projects.map((project) => (
        <div
          key={project.sys.id}
          className={cn(
            "flex h-full items-stretch self-stretch",
            mobileScrollable && "w-[75%] shrink-0 snap-start md:w-auto md:shrink"
          )}
        >
          <ProjectCard
            id={project.sys.id}
            image={project.fields.image.fields}
            title={project.fields.title}
            fieldDescription={project.fields.description}
            metaTags={project.metadata.tags}
            tags={tags}
            techStack={project.fields.techStack}
          />
        </div>
      ))}
      {mobileScrollable && <div aria-hidden="true" className="w-4 snap-none md:hidden" />}
    </div>
  );
}
