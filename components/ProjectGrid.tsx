import type { Project } from "@onur/data/api/project";
import type { Tag } from "@onur/data/api/tag";
import ProjectCard from "@onur/components/ProjectCard";

export default function ProjectGrid({
  projects,
  tags,
}: {
  projects: Project[];
  tags: Tag;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.sys.id}
          id={project.sys.id}
          image={project.fields.image.fields}
          title={project.fields.title}
          fieldDescription={project.fields.description}
          metaTags={project.metadata.tags}
          tags={tags}
          techStack={project.fields.techStack}
        />
      ))}
    </div>
  );
}
