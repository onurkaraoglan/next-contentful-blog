"use client";

import { useState, useMemo } from "react";
import { Post } from "@onur/data/api/post";
import { Tag } from "@onur/data/api/tag";
import PostCard from "@onur/components/PostCard";
import { Timeline } from "@onur/components/ui/timeline";
import { Button } from "@onur/components/ui/button";
import { EmptyState } from "@onur/components/ui/empty-state";

interface Props {
  posts: Post[];
  tags: Tag;
}

export default function BlogContent({ posts, tags }: Props) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeTag, setActiveTag] = useState<string>("all");

  const filterByTag = (filteredPosts: Post[], tagId: string) => {
    return filteredPosts.filter((post) => {
      return post.metadata.tags.some((t) => {
        return t.sys.id === tagId;
      });
    });
  };

  const handleTagClick = (tagId: string) => {
    setActiveTag(tagId);
    if (tagId === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(filterByTag(posts, tagId));
    }
  };

  const postsData = useMemo(
    () =>
      filteredPosts.map((post) => ({
        id: post.sys.id,
        title: post.fields.title,
        description: post.fields.description,
        date: post.fields.date,
        content: (
          <div className="w-full max-w-2xl mx-auto md:mx-0">
            <PostCard
              key={post.sys.id}
              date={post.fields.date}
              image={post.fields.image.fields}
              title={post.fields.title}
              fieldDescription={post.fields.description}
              id={post.sys.id}
              metaTags={post.metadata.tags}
              tags={tags}
            />
          </div>
        ),
      })),
    [filteredPosts, tags]
  );

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 py-12 md:py-20 space-y-16">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 relative bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)]">
          Blog
        </h1>
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          Thoughts, stories and ideas about software development
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={activeTag === "all" ? "default" : "outline"}
          onClick={() => handleTagClick("all")}
          size="sm"
        >
          All
        </Button>
        {tags &&
          tags.items.map((tag) => (
            <Button
              key={tag.name}
              variant={activeTag === tag.sys.id ? "default" : "outline"}
              onClick={() => handleTagClick(tag.sys.id)}
              size="sm"
            >
              {tag.name}
            </Button>
          ))}
      </div>
      <div>
        {postsData.length > 0 ? (
          <>
            <div className="block md:hidden mb-16">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[2px] w-2/3"></div>
                </div>
              </div>
            </div>
            <Timeline data={postsData} />
          </>
        ) : (
          <EmptyState message="We couldn't find any posts with that tag. How about trying another one? All the good content is just a click away! ✨" />
        )}
      </div>
      </div>
    </div>
  );
}

