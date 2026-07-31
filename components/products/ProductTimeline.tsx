import type { ReactNode } from "react";
import type { Product } from "@onur/data/api/product";
import type { Tag } from "@onur/data/api/tag";
import { TIMELINE_CONTENT_WIDTH, Timeline } from "@onur/components/ui/timeline";
import { EmptyState } from "@onur/components/ui/empty-state";
import { SectionHeading } from "@onur/components/ui/section-heading";
import ProductCard from "./ProductCard";

export function ProductTimeline({
  products,
  tags,
  heading,
  actionButton,
  emptyMessage = "No products have been published here yet.",
}: {
  products: Product[];
  tags: Tag;
  heading?: { title: string; subTitle?: string };
  actionButton?: ReactNode;
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <div>
        {heading && <SectionHeading title={heading.title} subTitle={heading.subTitle} />}
        <EmptyState message={emptyMessage} />
        {actionButton && (
          <div className={`mx-auto mt-8 w-full ${TIMELINE_CONTENT_WIDTH}`}>
            {actionButton}
          </div>
        )}
      </div>
    );
  }

  const timelineData = products.map((product) => ({
    id: product.sys.id,
    date: product.fields.date,
    content: (
      <div className="w-full">
        <ProductCard product={product} tags={tags} />
      </div>
    ),
  }));

  return (
    <Timeline
      data={timelineData}
      heading={heading}
      actionButton={actionButton}
    />
  );
}
