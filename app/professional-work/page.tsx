import type { Metadata } from "next";
import { getWorkRelatedProjects } from "@onur/data/api/project";
import { getProjectTags } from "@onur/data/api/tag";
import ProfessionalWorkContent from "./ProfessionalWorkContent";

export const metadata: Metadata = {
  title: "Professional Work",
  description: "Professional projects delivered by Onur Karaoğlan",
};

export const revalidate = 30;

export default async function ProfessionalWorkPage() {
  const [projects, tags] = await Promise.all([
    getWorkRelatedProjects(),
    getProjectTags(),
  ]);

  return <ProfessionalWorkContent projects={projects} tags={tags} />;
}
