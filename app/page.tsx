import { getTopTreePosts } from "@onur/data/api/post";
import { getPostTags, getProjectTags } from "@onur/data/api/tag";
import { getTopTreeProjects } from "@onur/data/api/project";
import { Hero } from "@onur/components/hero/Hero";
import { Timeline } from "@onur/components/ui/timeline";
import ProjectCard from "@onur/components/ProjectCard";
import PostCard from "@onur/components/PostCard";
import Link from "next/link";
import { GradientButton } from "@onur/components/ui/gradient-button";
import ResumeSection, {
  ResumeItem,
} from "@onur/components/resume/ResumeSection";
import {
  workExperiences,
  educationHistory,
} from "@onur/data/static/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "This is a homepage of Onur Karaoğlan's blog",
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function Home() {
  const posts = await getTopTreePosts();
  const projects = await getTopTreeProjects();
  const postTags = await getPostTags();
  const projectTags = await getProjectTags();
  const work: ResumeItem[] = workExperiences;
  const education: ResumeItem[] = educationHistory;

  const projectsData = projects.map((project) => ({
    id: project.sys.id,
    title: project.fields.title,
    description: project.fields.description,
    date: project.fields.date,
    content: (
      <div className="w-full max-w-2xl mx-auto md:mx-0">
        <ProjectCard
          key={project.sys.id}
          id={project.sys.id}
          image={project.fields.image.fields}
          title={project.fields.title}
          fieldDescription={project.fields.description}
          metaTags={project.metadata.tags}
          tags={projectTags}
          techStack={project.fields.techStack}
        />
      </div>
    ),
  }));

  const postsData = posts.map((post) => ({
    id: post.sys.id,
    title: post.fields.title,
    description: post.fields.description,
    date: post.fields.date,
    content: (
      <div className="w-full max-w-2xl mx-auto md:mx-0">
        <PostCard
          key={post.sys.id}
          id={post.sys.id}
          date={post.fields.date}
          image={post.fields.image.fields}
          title={post.fields.title}
          fieldDescription={post.fields.description}
          metaTags={post.metadata.tags}
          tags={postTags}
        />
      </div>
    ),
  }));

  return (
    <>
      <Hero />

      <div className="container mx-auto px-4 py-20 space-y-24 md:space-y-64">
        <Timeline
          data={projectsData}
          heading={{
            title: "Latest Projects",
            subTitle: "Check out my recent work",
          }}
          actionButton={
            <Link href="/projects" className="w-full">
              <GradientButton variant="outline" className="w-full">
                View All Projects
              </GradientButton>
            </Link>
          }
        />

        <div className="block md:hidden">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[2px] w-2/3"></div>
            </div>
          </div>
        </div>

        <ResumeSection
          heading={{ title: "Work Experience" }}
          items={work}
        />

        <ResumeSection
          heading={{ title: "Education" }}
          items={education}
        />

        <div className="block md:hidden">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[2px] w-2/3"></div>
            </div>
          </div>
        </div>

        <Timeline
          data={postsData}
          heading={{
            title: "Latest Posts",
            subTitle: "Recent articles and thoughts",
          }}
          actionButton={
            <Link href="/blog" className="w-full">
              <GradientButton variant="outline" className="w-full">
                View All Posts
              </GradientButton>
            </Link>
          }
        />
      </div>
    </>
  );
}
