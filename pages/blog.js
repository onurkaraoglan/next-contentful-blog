import Head from "next/head";
import Layout from "../components/layout";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import { fetchEntries, fetchTags } from "./api/post";
import { useState } from "react";

export default function Blog({ posts, tags }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const filterByTag = (filteredPosts, tag) => {
    return filteredPosts.filter((post) => {
      return post.metadata.tags.some((t) => {
        return t.sys.id === tag;
      });
    });
  };
  return (
    <Layout>
      <Head>
        <title>Onur - Blog</title>
        <meta name="description" content="Onur Karaoğlan's blog page" />
      </Head>
      <div className={styles.largecontainer}>
        <p className={styles.title}>Blog</p>
        <div className={styles.tags}>
          <div
            key="all"
            className={styles.tag}
            onClick={() => setFilteredPosts(posts)}
          >
            All
          </div>
          {tags &&
            tags.items.map((tag) => {
              return (
                <div
                  key={tag.name}
                  className={styles.tag}
                  onClick={() =>
                    setFilteredPosts(filterByTag(posts, tag.sys.id))
                  }
                >
                  {tag.sys.id}
                </div>
              );
            })}
        </div>
        <div>
          <div className={styles.cards}>
            {filteredPosts.map((post) => {
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await fetchEntries();
  const tags = await fetchTags();
  return {
    props: {
      posts,
      tags,
    },
  };
}
