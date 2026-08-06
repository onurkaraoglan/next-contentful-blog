import type { ReactNode } from "react";
import type { Product } from "@onur/data/api/product";
import type { Tag } from "@onur/data/api/tag";
import { EmptyState } from "@onur/components/ui/empty-state";
import { SectionHeading } from "@onur/components/ui/section-heading";
import { cn } from "@onur/lib/utils";
import ProductCard from "./ProductCard";

export function ProductGrid({
  products,
  tags,
  heading,
  actionButton,
  mobileScrollable = false,
  emptyMessage = "No products have been published here yet.",
}: {
  products: Product[];
  tags: Tag;
  heading?: { title: string; subTitle?: string };
  actionButton?: ReactNode;
  mobileScrollable?: boolean;
  emptyMessage?: string;
}) {
  return (
    <div>
      {heading && (
        <SectionHeading title={heading.title} subTitle={heading.subTitle} />
      )}

      {products.length > 0 ? (
        <div
          className={cn(
            "gap-6",
            mobileScrollable
              ? "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:snap-none md:overflow-visible"
              : "grid grid-cols-1 md:grid-cols-3"
          )}
        >
          {mobileScrollable && <div aria-hidden="true" className="w-4 snap-none md:hidden" />}
          {products.map((product) => (
            <div
              key={product.sys.id}
              className={cn(
                "h-full",
                mobileScrollable && "w-[75%] shrink-0 snap-start md:w-auto md:shrink"
              )}
            >
              <ProductCard product={product} tags={tags} />
            </div>
          ))}
          {mobileScrollable && <div aria-hidden="true" className="w-4 snap-none md:hidden" />}
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
