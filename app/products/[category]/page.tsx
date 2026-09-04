import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProducts,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@onur/data/api/product";
import { getProjectTags } from "@onur/data/api/tag";
import { ProductGrid } from "@onur/components/products/ProductGrid";
import { SectionHeading } from "@onur/components/ui/section-heading";
import CtaButton from "@onur/components/ui/cta-button";
import { getProductCategoryDetails } from "@onur/data/static/products";

interface Props {
  params: Promise<{ category: string }>;
}

export const revalidate = 300;

function isProductCategory(category: string): category is ProductCategory {
  return PRODUCT_CATEGORIES.includes(category as ProductCategory);
}

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isProductCategory(category)) return {};
  const copy = getProductCategoryDetails(category);
  return {
    title: copy?.title,
    description: copy?.description,
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isProductCategory(category)) notFound();

  const [products, tags] = await Promise.all([
    getProducts(category),
    getProjectTags(),
  ]);
  const copy = getProductCategoryDetails(category);
  if (!copy) notFound();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 pt-20 pb-20">
        <SectionHeading title={copy.title} subTitle={copy.description} />
        <ProductGrid
          products={products}
          tags={tags}
          emptyMessage={`No ${copy.title.toLowerCase()} have been published yet.`}
        />
        <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
          <CtaButton asChild variant="outline" className="w-full">
            <Link href="/products">Other Products</Link>
          </CtaButton>
          <CtaButton asChild variant="outline" className="w-full">
            <Link href="/professional-work">Professional Work</Link>
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
