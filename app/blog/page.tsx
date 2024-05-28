
import FetchPosts from "@blog/client/blog/FetchPosts";
import styles from "@blog/styles/Home.module.css";

export default function Blog() {
  return (
    <>
      <div className={styles.largecontainer}>
        <p className={styles.title}>Blog</p>
        <FetchPosts/>
      </div>
    </>
  );
}
