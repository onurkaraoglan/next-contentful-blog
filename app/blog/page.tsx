import { getPosts } from "@onur/data/api/post";
import { getPostTags } from "@onur/data/api/tag";
import BlogContent from "./BlogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Onur Karaoğlan's blog page",
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function Blog() {
  const posts = await getPosts();
  const tags = await getPostTags();

  return <BlogContent posts={posts} tags={tags} />;
}

