import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import slug from "slug";

export default function Card({
  date,
  image,
  title,
  description,
  id,
  metaTags,
}) {
  let { file, imgDescription } = image;
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
            alt={imgDescription}
            layout="responsive"
            height="70vh"
            width="100%"
            objectfit="cover"
            className={styles.img}
            unoptimized={true}
          />
        </div>
        <div style={{ position: "relative" }}>
          <div className={styles.card_content}>
            <p className={styles.card_date}>{date.substring(0, 10)}</p>
            <h2 className={styles.card_title}>{title}</h2>
            <p className={styles.card_text}>{description}</p>
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
            <Link href="/post/[id]" as={`/post/${slug(title)}-${id}`}>
              <a className={styles.btn}>Read More</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
