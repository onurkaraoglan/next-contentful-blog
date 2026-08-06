import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2, Puzzle, Smartphone } from "lucide-react";
import { getProducts } from "@onur/data/api/product";
import {
  productCategories,
  type ProductCategoryDetails,
} from "@onur/data/static/products";
import { SectionHeading } from "@onur/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Products",
  description: "Extensions, mobile apps and web apps built by Onur Karaoğlan",
};

export const revalidate = 30;

const icons = {
  puzzle: Puzzle,
  smartphone: Smartphone,
  globe: Globe2,
};

function CategoryCard({
  category,
  count,
}: {
  category: ProductCategoryDetails;
  count: number;
}) {
  const Icon = icons[category.icon];

  return (
    <Link
      href={`/products/${category.id}`}
      className="group flex min-h-64 flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/60">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" aria-hidden="true" />
      </div>

      <div className="mt-auto pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <p className="mt-5 text-xs font-medium capitalize tracking-[0.16em] text-muted-foreground">
          {count} {count === 1 ? "product" : "products"}
        </p>
      </div>
    </Link>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 pb-20 pt-20">
        <SectionHeading
          title="Products"
          subTitle="Choose a category to explore my extensions, mobile apps and web apps"
        />

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:snap-none md:overflow-visible">
          <div aria-hidden="true" className="w-4 snap-none md:hidden" />
          {productCategories.map((category) => (
            <div key={category.id} className="w-[75%] shrink-0 snap-start md:h-full md:w-auto md:shrink">
              <CategoryCard
                category={category}
                count={products.filter((product) => product.fields.category === category.id).length}
              />
            </div>
          ))}
          <div aria-hidden="true" className="w-4 snap-none md:hidden" />
        </div>
      </div>
    </div>
  );
}
