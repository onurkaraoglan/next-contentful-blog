"use client";

import { useMemo, useState } from "react";
import type { Project } from "@onur/data/api/project";
import type { Tag } from "@onur/data/api/tag";
import ProjectCard from "@onur/components/ProjectCard";
import { Timeline } from "@onur/components/ui/timeline";
import { Button } from "@onur/components/ui/button";
import { EmptyState } from "@onur/components/ui/empty-state";

export default function ProfessionalWorkContent({ projects, tags }: { projects: Project[]; tags: Tag }) {
  const [activeTag, setActiveTag] = useState("all");

  const filteredProjects = useMemo(
    () =>
      activeTag === "all"
        ? projects
        : projects.filter((project) => project.metadata.tags.some((tag) => tag.sys.id === activeTag)),
    [activeTag, projects]
  );

  const timelineData = useMemo(
    () =>
      filteredProjects.map((project) => ({
        id: project.sys.id,
        date: project.fields.date,
        content: (
          <div className="w-full max-w-2xl mx-auto md:mx-0">
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
        ),
      })),
    [filteredProjects, tags]
  );

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 pt-20 pb-20 space-y-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80">
            Professional Work
          </h1>
          <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
            A collection of projects delivered through my professional work
          </p>
        </div>

        {projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant={activeTag === "all" ? "default" : "outline"} onClick={() => setActiveTag("all")} size="sm">
              All
            </Button>
            {tags.items.map((tag) => (
              <Button key={tag.sys.id} variant={activeTag === tag.sys.id ? "default" : "outline"} onClick={() => setActiveTag(tag.sys.id)} size="sm">
                {tag.name}
              </Button>
            ))}
          </div>
        )}

        {timelineData.length > 0 ? (
          <Timeline data={timelineData} />
        ) : (
          <EmptyState message="No work projects here with that tag. Check out the other tags to see what I've been working on! 💼" />
        )}
      </div>
    </div>
  );
}
