import { fetchTopTreeEntries } from "@blog/api/post";
import Card from "@blog/components/Card";

async function getPosts() {
  let response = await fetchTopTreeEntries();
  return response;
}

export default async function ListPosts() {
  const posts = await getPosts();
  return (
    <>
      {posts?.map((post) => {
        return (
          posts && (
            <Card
              key={post.sys.id}
              date={post.fields.date}
              image={post.fields.image.fields}
              title={post.fields.title}
              fieldDescription={post.fields.description}
              id={post.sys.id}
              metaTags={post.metadata.tags}
            />
          )
        );
      })}
    </>
  );
}
