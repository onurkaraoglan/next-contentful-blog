import type { Metadata } from "next";
import { notFound } from "next/navigation";
import slug from "slug";
import { getProject, getWorkRelatedProjects } from "@onur/data/api/project";
import { getProjectTags } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import PortfolioDetail from "@onur/components/PortfolioDetail";

interface Props {
  params: Promise<{ id: string }>;
}

function getEntryId(paramId: string) {
  return paramId.split("-").at(-1) || "";
}

async function getProfessionalProject(paramId: string) {
  const project = await getProject(getEntryId(paramId));
  return project?.fields.isPersonal === false ? project : null;
}

export async function generateStaticParams() {
  const projects = await getWorkRelatedProjects();
  return projects.map((project) => ({
    id: `${slug(project.fields.title)}-${project.sys.id}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProfessionalProject((await params).id);
  if (!project) return {};
  return { title: `Professional Work - ${project.fields.title}`, description: project.fields.description };
}

export default async function ProfessionalWorkDetailPage({ params }: Props) {
  const project = await getProfessionalProject((await params).id);
  if (!project) notFound();

  const tags = await getProjectTags();
  const tagNames = project.metadata.tags
    .map((tag) => getTagNameById(tags.items, tag.sys.id))
    .filter((tag): tag is string => Boolean(tag));

  return (
    <PortfolioDetail
      title={project.fields.title}
      description={project.fields.description}
      image={project.fields.image?.fields}
      tags={tagNames}
      techStack={project.fields.techStack}
      url={project.fields.url}
      appStoreUrl={project.fields.appStoreUrl}
      googlePlayUrl={project.fields.googlePlayUrl}
    />
  );
}
