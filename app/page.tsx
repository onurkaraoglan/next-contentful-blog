import styles from "@blog/styles/Home.module.css";
import Link from "next/link";
import type { Metadata } from "next";
import ListPosts from "@blog/client/home/posts/List";

export const metadata: Metadata = {
  title: "Onur - Home",
  description: `This is a homepage of Onur Karaoğlan's blog`,
};
export default async function Home() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Hi, I am Onur Karaoğlan</p>
        <p className={styles.content}>
          I'm Onur Karaoğlan, a Full Stack Engineer from Istanbul, Turkey. I
          love to learn and discover new things about Web Development. You can
          catch my code snippets on Twitter and Linkedin.{" "}
          <Link href="/about">Click here to learn more about me.</Link>
        </p>
      </div>
      <div className={styles.largecontainer}>
        <div className={styles.section}>
          <p className={styles.title}>Latest Posts</p>
          <div className={styles.home_cards}>{<ListPosts/>}</div>
          <div className={styles.section_btn}>
            <Link href="/blog" className={styles.btn}>
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
