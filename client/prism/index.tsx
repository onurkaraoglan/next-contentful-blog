"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS, BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import styles from "@blog/styles/Home.module.css";

export default function Highlight({ fields, languages }) {
  const rawRichTextField = fields.body;
  let { file, imgDescription } = fields.image.fields;
  const src = `https:${file.url}`;
  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => (
        <pre className="line-numbers">
          <code className={languages}>{text}</code>
        </pre>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) => {
        return (
          <Image
            loader={() => `https:${fields.file.url}`}
            src={`https:${fields.file.url}`}
            alt={fields.description ?? 'content'}
            width={0}
            height={0}
            style={{
              height: "auto",
              width: "100%",
            }}
          />
        );
      },
      [INLINES.HYPERLINK]: (node) => {
        if (node.data.uri.includes("player.vimeo.com/video")) {
          return (
            <iframe
              title="Unique Title 001"
              src={node.data.uri}
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
              allowFullScreen
              className={styles.frame}
            ></iframe>
          );
        }
      },
    },
  };

  const body = documentToReactComponents(rawRichTextField, options as any);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <>
      <Image
      loader={() => src}
        src={src}
        alt={imgDescription ?? 'head image'}
        className={styles.img}
        unoptimized={true}
        width={0}
        height={0}
        style={{
          height: "70vh",
          width: "100%",
        }}
      />
      {body}
    </>
  );
}
