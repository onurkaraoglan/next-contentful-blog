import type { ReactNode } from "react";
import type { Product } from "@onur/data/api/product";
import type { Tag } from "@onur/data/api/tag";
import { EmptyState } from "@onur/components/ui/empty-state";
import { SectionHeading } from "@onur/components/ui/section-heading";
import ProductCard from "./ProductCard";

export function ProductGrid({
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
  return (
    <div>
      {heading && (
        <SectionHeading title={heading.title} subTitle={heading.subTitle} />
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.sys.id}
              product={product}
              tags={tags}
            />
          ))}
        </div>
      ) : (
        <EmptyState message={emptyMessage} />
      )}

      {actionButton && (
        <div className="mx-auto mt-8 w-full max-w-sm">{actionButton}</div>
      )}
    </div>
  );
}
