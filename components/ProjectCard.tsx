"use client";

import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import { ImageFields, MetadataTag } from "@onur/data/api/project";
import { Tag } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { slugify } from "@onur/lib/string";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@onur/components/ui/card";
import  CtaButton  from "@onur/components/ui/cta-button";

interface Props {
  id: string;
  image: ImageFields;
  title: string;
  fieldDescription: string;
  metaTags: MetadataTag[];
  tags: Tag;
  techStack: string[];
}

function SingleLineMeasuredRow<T>({
  items,
  getKey,
  renderItem,
  renderMoreBadge
}: {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  renderMoreBadge: (hiddenCount: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const resetVisibleCount = () => {
      setVisibleCount(items.length);
    };

    const resizeObserver = new ResizeObserver(() => {
      resetVisibleCount();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (container.scrollWidth > container.clientWidth && visibleCount > 0) {
      setVisibleCount((currentVisibleCount) => Math.max(0, currentVisibleCount - 1));
    }
  }, [visibleCount, items]);

  const visibleItems = items.slice(0, visibleCount);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <div
      ref={containerRef}
      className="flex h-8 min-h-8 max-h-8 flex-nowrap items-center gap-2 overflow-hidden"
    >
      {visibleItems.map((item) => (
        <div key={getKey(item)} className="shrink-0">
          {renderItem(item)}
        </div>
      ))}
      {hiddenCount > 0 && renderMoreBadge(hiddenCount)}
    </div>
  );
}

export default function ProjectCard(props: Props) {
  const { image, title, fieldDescription, id, metaTags, techStack } = props;
  let { file, description } = image;
  const src = useMemo(() => `https:${file.url}`, [file.url]);
  const tags = useMemo(() => {
    return metaTags
      .map((tag) => getTagNameById(props.tags.items, tag.sys.id))
      .filter((tag): tag is string => Boolean(tag));
  }, [metaTags, props.tags.items]);

  return (
    <Card className="group relative flex h-[34rem] w-full flex-col overflow-hidden border-border/70 bg-background shadow-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={src}
            alt={description}
            fill
            className="object-cover object-top"
            unoptimized={true}
            loading="eager"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-4">
              {fieldDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pb-0">
          <div className="min-h-0 flex-1" />
          <div className="mt-auto space-y-3">
            <SingleLineMeasuredRow
              items={tags}
              getKey={(tag) => tag}
              renderItem={(tag) => (
                <span className="whitespace-nowrap px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              )}
              renderMoreBadge={(hiddenCount) => (
                <span
                  className="shrink-0 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                >
                  +{hiddenCount} more
                </span>
              )}
            />

            <SingleLineMeasuredRow
              items={techStack}
              getKey={(stack) => stack}
              renderItem={(stack) => (
                <div className="flex items-center gap-1 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-muted">
                  <Image
                    src={`/images/tech/${slugify(stack)}.svg`}
                    alt={stack}
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                    unoptimized={true}
                  />
                  <span>{stack}</span>
                </div>
              )}
              renderMoreBadge={(hiddenCount) => (
                <div
                  className="flex shrink-0 items-center whitespace-nowrap px-2 py-1 text-xs rounded-md bg-muted"
                >
                  <span>+{hiddenCount} more</span>
                </div>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="pt-3">
          <Link
            aria-label={slug(title)}
            href={`/professional-work/${slug(title)}-${id}`}
            className="w-full"
          >
            <CtaButton className="w-full">View Details</CtaButton>
          </Link>
        </CardFooter>
    </Card>
  );
}
