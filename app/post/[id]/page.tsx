'use server';
import styles from "@blog/styles/Home.module.css";

import { fetchEntry } from "@blog/api/post";
import Highlight from "@blog/client/prism";

async function getPosts(id) {
  let response = await fetchEntry(id);
  return response;
}

export default async function Post({ params }) {
  const id = params.id.split("-").slice(-1)[0];
  const post: any =  await getPosts(id);
  if (!post) {
    console.error('Post not found');
    return {
      notFound: true
    };
  }

  let languages = "";
  post?.fields.languages.forEach((language) => {
    languages = languages + `language-${language} `;
  });

  const tags = post.metadata.tags.map((tag) => {
    return tag.sys.id;
  });

  return (
      <div className={styles.container}>
        <div className={styles.post_tags}>
          {tags.map((tag) => {
            return (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            );
          })}
        </div>
        <p className={styles.blogtitle}>{post.fields.title}</p>
        <p className={styles.blogdescription}>{post.fields.description}</p>
        
        <Highlight fields={post.fields} languages={languages} />
      </div>
  );
}