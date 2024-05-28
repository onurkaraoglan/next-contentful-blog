'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "@blog/styles/Home.module.css";
import slug from "slug";
import moment from "moment";

export default function Card({
  date,
  image,
  title,
  fieldDescription,
  id,
  metaTags,
}) {
  let { file, description } = image;
  const src = `https:${file.url}`;
  const tags = metaTags.map((tag) => {
    return tag.sys.id;
  });
  return (
    <div className={styles.cards_item}>
      <div className={styles.card}>
        <div className={styles.card_image}>
          <Image
            loader={() => src}
            src={src}
            alt={description}
            unoptimized={true}
            width={0}
            height={0}
          />
        </div>
        <div style={{ position: "relative" }}>
          <div className={styles.card_content}>
            <p className={styles.card_date}>
              {/* {date.substring(0, 10)} */}
              {moment(date).format("MMM Do, YYYY")}
            </p>
            <h2 className={styles.card_title}>{title}</h2>
            <p className={styles.card_text}>{fieldDescription}</p>
          </div>
          <div className={styles.card_bottom}>
            <div className={styles.card_tags}>
              {tags.map((tag) => {
                return (
                  <div key={tag} className={styles.card_tag}>
                    {tag}
                  </div>
                );
              })}
            </div>
            <Link
              href="/post/[id]"
              as={`/post/${slug(title)}-${id}`}
              className={styles.btn}
              aria-label={slug(title)}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
