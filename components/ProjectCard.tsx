import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import { ImageFields, MetadataTag } from "@onur/data/api/project";
import { Tag } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import { useMemo } from "react";
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

export default function ProjectCard(props: Props) {
  const { image, title, fieldDescription, id, metaTags, techStack } = props;
  let { file, description } = image;
  const src = useMemo(() => `https:${file.url}`, [file.url]);
  const tags = useMemo(() => {
    return metaTags.map((tag) => {
      return getTagNameById(props.tags.items, tag.sys.id);
    });
  }, [metaTags, props.tags.items]);

  return (
    <div className="group relative h-full">
      <Card className="relative flex h-full flex-col overflow-hidden border-border/70 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {fieldDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((stack, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted"
              >
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
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link
            aria-label={slug(title)}
            href={`/professional-work/${slug(title)}-${id}`}
            className="w-full"
          >
            <CtaButton className="w-full">View Details</CtaButton>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
