import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import { fetchEntry, fetchEntries } from "../api/post";
import slug from "slug";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Post({ post }) {
  const rawRichTextField = post.fields.body;
  const body = documentToReactComponents(rawRichTextField);
  let { file, imgDescription } = post.fields.image.fields;
  const src = `https:${file.url}`;
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Onur - Blog - {post.fields?.title}</title>
          <meta name="description" content="Generated by create next app" />
        </Head>
        <p className={styles.title}>{post.fields.title}</p>
        <p className={styles.description}>{post.fields.description}</p>
        <Image
          loader={() => src}
          src={src}
          alt={imgDescription}
          layout="responsive"
          height="70vh"
          width="100%"
          objectfit="cover"
          className={styles.img}
          unoptimized={true}
        />
        <span>{body}</span>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetchEntries();
  const posts = await res.map((p) => {
    return p;
  });
  return {
    paths: posts.map((post) => {
      return {
        params: { id: `${slug(post.fields.title)}-${post.sys.id}` },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id.split("-").slice(-1)[0];
  const post = await fetchEntry(id);
  return {
    props: {
      post,
    },
  };
}