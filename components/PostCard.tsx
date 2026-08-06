import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import { ImageFields, MetadataTag } from "@onur/data/api/project";
import { Tag } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@onur/components/ui/card";
import  CtaButton  from "@onur/components/ui/cta-button";

interface Props {
  id: string;
  image: ImageFields;
  title: string;
  fieldDescription: string;
  metaTags: MetadataTag[];
  tags: Tag;
}

export default function PostCard(props: Props) {
  const { image, title, fieldDescription, id, metaTags } = props;
  let { file, description } = image;
  const src = useMemo(() => `https:${file.url}`, [file.url]);
  const tags = useMemo(() => {
    return metaTags.map((tag) => {
      return getTagNameById(props.tags.items, tag.sys.id);
    });
  }, [metaTags, props.tags.items]);
  
  return (
    <div className="relative group">
      
      <Card className="relative flex h-full flex-col overflow-hidden border-border/70 bg-background shadow-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={src}
          alt={description}
          fill
          className="object-cover"
          unoptimized={true}
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{fieldDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex min-h-12 flex-wrap content-start gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          aria-label={slug(title)}
          href="/post/[id]"
          as={`/post/${slug(title)}-${id}`}
          className="w-full"
        >
          <CtaButton className="w-full">
            Read More
          </CtaButton>
        </Link>
      </CardFooter>
      </Card>
    </div>
  );
}
