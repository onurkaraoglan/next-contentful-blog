import { getTopTreePosts } from "@onur/data/api/post";
import { getPostTags, getProjectTags } from "@onur/data/api/tag";
import { getLatestProfessionalProjects } from "@onur/data/api/project";
import { getLatestProducts } from "@onur/data/api/product";
import { Hero } from "@onur/components/hero/Hero";
import { Timeline } from "@onur/components/ui/timeline";
import ProjectGrid from "@onur/components/ProjectGrid";
import { ProductGrid } from "@onur/components/products/ProductGrid";
import PostCard from "@onur/components/PostCard";
import Link from "next/link";
import  CtaButton  from "@onur/components/ui/cta-button";
import ResumeSection, {
  ResumeItem,
} from "@onur/components/resume/ResumeSection";
import { SectionHeading } from "@onur/components/ui/section-heading";
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
  const products = await getLatestProducts();
  const professionalProjects = await getLatestProfessionalProjects();
  const postTags = await getPostTags();
  const projectTags = await getProjectTags();
  const work: ResumeItem[] = workExperiences;
  const education: ResumeItem[] = educationHistory;

  const postsData = posts.map((post) => ({
    id: post.sys.id,
    date: post.fields.date,
    content: (
      <div className="w-full max-w-2xl mx-auto md:mx-0">
        <PostCard
          key={post.sys.id}
          id={post.sys.id}
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
        <ProductGrid
          products={products}
          tags={projectTags}
          mobileScrollable
          heading={{
            title: "Latest Products",
            subTitle: "Recent extensions, mobile apps and web apps",
          }}
          actionButton={
            <Link href="/products" className="w-full max-w-sm">
              <CtaButton variant="outline" className="w-full">
                View All Products
              </CtaButton>
            </Link>
          }
        />

        <section>
          <SectionHeading
            title="Latest Professional Work"
            subTitle="Recent projects delivered through my professional work"
          />
          <ProjectGrid
            projects={professionalProjects}
            tags={projectTags}
            mobileScrollable
          />
          <div className="mx-auto mt-8 w-full max-w-sm">
            <Link href="/professional-work" className="w-full">
              <CtaButton variant="outline" className="w-full">
                View All Professional Work
              </CtaButton>
            </Link>
          </div>
        </section>

        <ResumeSection
          heading={{ title: "Work Experience" }}
          items={work}
        />

        <ResumeSection
          heading={{ title: "Education" }}
          items={education}
        />

        <Timeline
          data={postsData}
          heading={{
            title: "Latest Posts",
            subTitle: "Recent articles and thoughts",
          }}
          actionButton={
            <Link href="/blog" className="w-full">
              <CtaButton variant="outline" className="w-full">
                View All Posts
              </CtaButton>
            </Link>
          }
        />
      </div>
    </>
  );
}
