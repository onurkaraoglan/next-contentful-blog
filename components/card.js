import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Card({ date, image, title, description }) {
  let { file, imgDescription } = image;
  return (
    <div className={styles.cards_item}>
      <div className={styles.card}>
        <div className={styles.card_image}>
          <img
            // src="https://picsum.photos/500/300/?image=10"
            src={`https:${file.url}`}
            alt={imgDescription}
            layout="responsive"
            objectfit="cover"
            className={styles.img}
          />
        </div>
        <div className={styles.card_content}>
          <p className={styles.card_date}>{date.substring(0, 10)}</p>
          <h2 className={styles.card_title}>{title}</h2>
          <p className={styles.card_text}>{description}</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </div>
  );
}
