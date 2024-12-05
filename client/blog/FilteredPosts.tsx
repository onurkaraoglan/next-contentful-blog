"use client";

import { useState } from "react";
import Card from "@blog/components/Card";
import styles from "@blog/styles/Home.module.css";

interface Props {
  posts: any;
  tags: any;
}

export default function FilteredPosts(props: Props) {
  const { posts, tags } = props;
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const filterByTag = (filteredPosts, tag) => {
    return filteredPosts.filter((post) => {
      return post.metadata.tags.some((t) => {
        return t.sys.id === tag;
      });
    });
  };

  return (
    <>
      <div className={styles.tags}>
        <div
          key="all"
          className={styles.tag}
          onClick={() => setFilteredPosts(posts)}
        >
          All
        </div>
        {tags &&
          tags.items.map((tag) => {
            return (
              <div
                key={tag.name}
                className={styles.tag}
                onClick={() => setFilteredPosts(filterByTag(posts, tag.sys.id))}
              >
                {tag.sys.id}
              </div>
            );
          })}
      </div>
      <div>
        <div className={styles.cards}>
          {filteredPosts.map((post) => {
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
      </div>
    </>
  );
}
