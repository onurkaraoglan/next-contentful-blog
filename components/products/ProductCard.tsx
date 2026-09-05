import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import type { Product } from "@onur/data/api/product";
import type { Tag } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
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
import { ProductStatisticChip } from "./ProductStatisticChip";

export default function ProductCard({
  product,
  tags,
  opensDetailInNewTab = false,
}: {
  product: Product;
  tags: Tag;
  opensDetailInNewTab?: boolean;
}) {
  const { fields, metadata, sys } = product;
  const src = `https:${fields.image.fields.file.url}`;
  const tagNames = metadata.tags
    .map((tag) => getTagNameById(tags.items, tag.sys.id))
    .filter((tag): tag is string => Boolean(tag));
  const detailHref = `/product/${slug(fields.title)}-${sys.id}`;
  const hasStoreUrl = Boolean(fields.webStoreUrl || fields.appStoreUrl || fields.googlePlayUrl);
  const shouldLinkDirectlyToProductUrl =
    fields.category === "web-apps" && Boolean(fields.url) && !hasStoreUrl;
  const ctaHref = shouldLinkDirectlyToProductUrl ? fields.url! : detailHref;
  const shouldOpenCtaInNewTab =
    shouldLinkDirectlyToProductUrl || opensDetailInNewTab;

  return (
    <div className="relative group h-full">
      <Card className="relative flex h-full flex-col overflow-hidden border-border/70 bg-background shadow-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={src}
            alt={fields.image.fields.description || fields.title}
            fill
            className="object-cover object-top"
            unoptimized
            loading="eager"
          />
        </div>
        <CardHeader className="relative">
          <CardTitle>{fields.title}</CardTitle>
          <CardDescription className="line-clamp-4">
            {fields.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex flex-1 flex-col gap-4">
          {fields.statistics && fields.statistics.length > 0 && (
            <div className="flex min-h-6 flex-wrap gap-2 justifiy-evenly">
              {fields.statistics.slice(0, 3).map((statistic) => (
                <ProductStatisticChip key={statistic.sys.id} statistic={statistic} />
              ))}
            </div>
          )}
          <div className="flex min-h-2 flex-wrap content-start gap-2">
            {tagNames.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex min-h-2 flex-wrap content-start gap-2">
            {(fields.techStack || []).map((stack) => (
              <div key={stack} className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted">
                <Image
                  src={`/images/tech/${slugify(stack)}.svg`}
                  alt={stack}
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                  unoptimized
                />
                <span>{stack}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="relative">
          <CtaButton asChild className="w-full">
            <Link
              href={ctaHref}
              {...(shouldOpenCtaInNewTab
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              View Details
            </Link>
          </CtaButton>
        </CardFooter>
      </Card>
    </div>
  );
}
