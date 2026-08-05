import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import slug from "slug";
import {
  getProject,
  getRelatedProfessionalProjects,
  getWorkRelatedProjects,
} from "@onur/data/api/project";
import { getProjectTags } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import PortfolioDetail from "@onur/components/PortfolioDetail";
import ProjectGrid from "@onur/components/ProjectGrid";
import { SectionHeading } from "@onur/components/ui/section-heading";
import CtaButton from "@onur/components/ui/cta-button";

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

  const [tags, relatedProjects] = await Promise.all([
    getProjectTags(),
    getRelatedProfessionalProjects(project.sys.id),
  ]);
  const tagNames = project.metadata.tags
    .map((tag) => getTagNameById(tags.items, tag.sys.id))
    .filter((tag): tag is string => Boolean(tag));

  return (
    <>
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

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 md:px-0">
        {relatedProjects.length > 0 && (
          <>
            <SectionHeading title="Other Works" />
            <ProjectGrid projects={relatedProjects} tags={tags} />
          </>
        )}
        <div className="mx-auto mt-8 w-full max-w-sm">
          <CtaButton asChild variant="outline" className="w-full">
            <Link href="/professional-work">View All Works</Link>
          </CtaButton>
        </div>
      </section>
    </>
  );
}
