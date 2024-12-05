import { fetchEntries, fetchTags } from "@blog/api/post";
import FilteredPosts from "./FilteredPosts";

async function getPosts() {
  let response = await fetchEntries();
  return response;
}

async function getTags() {
  let response = await fetchTags();
  return response;
}

export default async function FetchPosts() {
  const posts = await getPosts();
  const tags = await getTags();

  return <FilteredPosts posts={posts} tags={tags} />
}
