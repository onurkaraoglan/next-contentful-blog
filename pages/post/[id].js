import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import { fetchEntry, fetchEntries } from "../api/post";
import slug from "slug";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS, BLOCKS, INLINES } from "@contentful/rich-text-types";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";

export default function Post({ post }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  let languages = "";
  post.fields.languages.forEach((language) => {
    languages = languages + `language-${language} `;
  });
  const options = {
    renderMark: {
      [MARKS.CODE]: (code) => (
        <pre className="line-numbers">
          <code className={languages}>{code}</code>
        </pre>
      ),
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) => {
        return (
          <img
            src={fields.file.url}
            width="100%"
            height="auto"
            alt={fields.description}
          />
        );
      },
      [INLINES.HYPERLINK]: (node) => {
        if (node.data.uri.includes("player.vimeo.com/video")) {
          return (
            <iframe
              title="Unique Title 001"
              src={node.data.uri}
              frameBorder="0"
              allowFullScreen
              className={styles.frame}
            ></iframe>
          );
        } else if (node.data.uri.includes("youtube.com/embed")) {
          return (
            <iframe
              title="Unique Title 002"
              src={node.data.uri}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
              className={styles.frame}
            ></iframe>
          );
        }
      },
    },
  };

  const rawRichTextField = post.fields.body;
  const body = documentToReactComponents(rawRichTextField, options);
  let { file, imgDescription } = post.fields.image.fields;
  const src = `https:${file.url}`;
  const tags = post.metadata.tags.map((tag) => {
    return tag.sys.id;
  });

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
