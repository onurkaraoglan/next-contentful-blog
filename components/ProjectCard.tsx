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
import { GradientButton } from "@onur/components/ui/gradient-button";

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
    <div className="relative group">
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-background border-border md:border-0 ">
        <div className="hidden md:block absolute -inset-[1px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-5 group-hover:opacity-15 transition-opacity duration-500"></div>
        <div className="md:hidden block absolute -inset-[1px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-15"></div>
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
          <CardDescription>{fieldDescription}</CardDescription>
        </CardHeader>
        <CardContent>
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
                  className="w-4 h-4"
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
            href="/project/[id]"
            as={`/project/${slug(title)}-${id}`}
            className="w-full"
          >
            <GradientButton className="w-full">View Details</GradientButton>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
