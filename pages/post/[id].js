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
  const tags = post.metadata.tags.map((tag) => {
    return tag.sys.id;
  });
  if (typeof window !== "undefined") {
    let codes = document.querySelectorAll("code");
    for (let i = 0; i < codes.length; i++) {
      codes[i].classList.add(styles.code);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Onur - Blog - {post.fields?.title}</title>
        <meta name="description" content={post.fields?.description} />
      </Head>
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
  const posts = await fetchEntries();
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
