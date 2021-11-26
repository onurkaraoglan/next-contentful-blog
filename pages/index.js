import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { fetchTopTreeEntries } from "./api/post";
import Card from "../components/card";

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Onur - Home</title>
        <meta
          name="description"
          content="This is a homepage of Onur Karaoğlan's blog"
        />
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>Hi, I am Onur Karaoğlan</p>
        <p className={styles.content}>
          I'm Onur Karaoğlan, a Full Stack Engineer from Istanbul, Turkey. I
          love to learn and discover new things about Web Development. You can
          catch my code snippets on Twitter and Linkedin.{" "}
          <Link href="/about">
            <a>Click here to learn more about me.</a>
          </Link>
        </p>
      </div>
      <div className={styles.largecontainer}>
        <div className={styles.section}>
          <p className={styles.title}>Latest Posts</p>
          <div className={styles.home_cards}>
            {posts.map((post) => {
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
          <div className={styles.section_btn}>
            <Link href="/blog">
              <a className={styles.btn}>All Posts</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await fetchTopTreeEntries();
  return {
    props: {
      posts,
    },
  };
}
