"use client";

import { useState, useMemo } from "react";
import { Project } from "@onur/data/api/project";
import { Tag } from "@onur/data/api/tag";
import ProjectCard from "@onur/components/ProjectCard";
import { Timeline } from "@onur/components/ui/timeline";
import { Button } from "@onur/components/ui/button";
import { EmptyState } from "@onur/components/ui/empty-state";

interface Props {
  personalProjects: Project[];
  workRelatedProjects: Project[];
  tags: Tag;
}

const filterByTag = (filteredProjects: Project[], tagId: string) => {
  return filteredProjects.filter((post) => {
    return post.metadata.tags.some((t) => {
      return t.sys.id === tagId;
    });
  });
};

export default function ProjectsContent({
  personalProjects,
  workRelatedProjects,
  tags,
}: Props) {
  const [filteredPersonalProjects, setFilteredPersonalProjects] =
    useState(personalProjects);
  const [filteredWorkRelatedProjects, setFilteredWorkRelatedProjects] =
    useState(workRelatedProjects);
  const [activePersonalTag, setActivePersonalTag] = useState<string>("all");
  const [activeWorkTag, setActiveWorkTag] = useState<string>("all");

  const handlePersonalTagClick = (tagId: string) => {
    setActivePersonalTag(tagId);
    if (tagId === "all") {
      setFilteredPersonalProjects(personalProjects);
    } else {
      setFilteredPersonalProjects(filterByTag(personalProjects, tagId));
    }
  };

  const handleWorkTagClick = (tagId: string) => {
    setActiveWorkTag(tagId);
    if (tagId === "all") {
      setFilteredWorkRelatedProjects(workRelatedProjects);
    } else {
      setFilteredWorkRelatedProjects(filterByTag(workRelatedProjects, tagId));
    }
  };

  const personalProjectsData = useMemo(
    () =>
      filteredPersonalProjects.map((project) => ({
        id: project.sys.id,
        title: project.fields.title,
        description: project.fields.description,
        date: project.fields.date,
        content: (
          <div className="w-full max-w-2xl mx-auto md:mx-0">
            <ProjectCard
              key={project.sys.id}
              image={project.fields.image.fields}
              title={project.fields.title}
              fieldDescription={project.fields.description}
              id={project.sys.id}
              metaTags={project.metadata.tags}
              tags={tags}
              techStack={project.fields.techStack}
            />
          </div>
        ),
      })),
    [filteredPersonalProjects, tags]
  );

  const workProjectsData = useMemo(
    () =>
      filteredWorkRelatedProjects.map((project) => ({
        id: project.sys.id,
        title: project.fields.title,
        description: project.fields.description,
        date: project.fields.date,
        content: (
          <div className="w-full max-w-2xl mx-auto md:mx-0">
            <ProjectCard
              key={project.sys.id}
              image={project.fields.image.fields}
              title={project.fields.title}
              fieldDescription={project.fields.description}
              id={project.sys.id}
              metaTags={project.metadata.tags}
              tags={tags}
              techStack={project.fields.techStack}
            />
          </div>
        ),
      })),
    [filteredWorkRelatedProjects, tags]
  );

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 pt-20 pb-20 space-y-20">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 relative bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)]">
          Projects
        </h1>
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          A collection of my personal and professional work
        </p>
      </div>

      {personalProjects.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center">
            Personal Projects
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activePersonalTag === "all" ? "default" : "outline"}
              onClick={() => handlePersonalTagClick("all")}
              size="sm"
            >
              All
            </Button>
            {tags &&
              tags.items.map((tag) => (
                <Button
                  key={tag.name}
                  variant={
                    activePersonalTag === tag.sys.id ? "default" : "outline"
                  }
                  onClick={() => handlePersonalTagClick(tag.sys.id)}
                  size="sm"
                >
                  {tag.name}
                </Button>
              ))}
          </div>

          <div>
            {personalProjectsData.length > 0 ? (
              <>
                <div className="block md:hidden mb-16">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[1px] w-1/2"></div>
                    </div>
                  </div>
                </div>
                <Timeline data={personalProjectsData} />
              </>
            ) : (
              <EmptyState message="Hmm, no personal projects match that tag. Feel free to explore other tags to discover more! 🚀" />
            )}
          </div>
        </div>
      )}

      {personalProjects.length > 0 && workRelatedProjects.length > 0 && (
        <div className="block md:hidden py-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[1px] w-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {workRelatedProjects.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center">
            Work Related Projects
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeWorkTag === "all" ? "default" : "outline"}
              onClick={() => handleWorkTagClick("all")}
              size="sm"
            >
              All
            </Button>
            {tags &&
              tags.items.map((tag) => (
                <Button
                  key={tag.name}
                  variant={
                    activeWorkTag === tag.sys.id ? "default" : "outline"
                  }
                  onClick={() => handleWorkTagClick(tag.sys.id)}
                  size="sm"
                >
                  {tag.name}
                </Button>
              ))}
          </div>

          <div>
            {workProjectsData.length > 0 ? (
              <>
                <div className="block md:hidden mb-16">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[1px] w-1/2"></div>
                    </div>
                  </div>
                </div>
                <Timeline data={workProjectsData} />
              </>
            ) : (
              <EmptyState message="No work projects here with that tag. Check out the other tags to see what I've been working on! 💼" />
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

