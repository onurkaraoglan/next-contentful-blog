import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { ImageFields, MetadataTag } from "@onur/data/api/project";
import { Tag } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@onur/components/ui/card";
import { GradientButton } from "@onur/components/ui/gradient-button";

dayjs.extend(advancedFormat);

interface Props {
  id: string;
  date: string;
  image: ImageFields;
  title: string;
  fieldDescription: string;
  metaTags: MetadataTag[];
  tags: Tag;
}

export default function PostCard(props: Props) {
  const { date, image, title, fieldDescription, id, metaTags } = props;
  let { file, description } = image;
  const src = useMemo(() => `https:${file.url}`, [file.url]);
  const tags = useMemo(() => {
    return metaTags.map((tag) => {
      return getTagNameById(props.tags.items, tag.sys.id);
    });
  }, [metaTags, props.tags.items]);
  
  return (
    <div className="relative group">
      
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-background border-border md:border-0">
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
        <p className="text-sm text-muted-foreground mb-2">
          {dayjs(date).format("MMM Do, YYYY")}
        </p>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{fieldDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
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
          <GradientButton className="w-full">
            Read More
          </GradientButton>
        </Link>
      </CardFooter>
      </Card>
    </div>
  );
}
