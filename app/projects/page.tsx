import {
  getPersonalProjects,
  getWorkRelatedProjects,
} from "@onur/data/api/project";
import { getProjectTags } from "@onur/data/api/tag";
import ProjectsContent from "./ProjectsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Onur Karaoğlan's projects",
};

export const revalidate = 30;

export default async function Projects() {
  const personalProjects = await getPersonalProjects();
  const workRelatedProjects = await getWorkRelatedProjects();
  const tags = await getProjectTags();

  return (
    <ProjectsContent
      personalProjects={personalProjects}
      workRelatedProjects={workRelatedProjects}
      tags={tags}
    />
  );
}

