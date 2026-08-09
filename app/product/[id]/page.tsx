import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import slug from "slug";
import {
  type Product,
  getProduct,
  getProducts,
  getRelatedProducts,
} from "@onur/data/api/product";
import { getProductLandingPage } from "@onur/data/api/product-landing-page";
import { getProjectTags } from "@onur/data/api/tag";
import { getProductCategoryDetails } from "@onur/data/static/products";
import { getTagNameById } from "@onur/lib/tag";
import PortfolioDetail from "@onur/components/PortfolioDetail";
import ProductLandingPage from "@onur/components/products/ProductLandingPage";
import { ProductGrid } from "@onur/components/products/ProductGrid";
import CtaButton from "@onur/components/ui/cta-button";

interface Props {
  params: Promise<{ id: string }>;
}

function getEntryId(paramId: string) {
  return paramId.split("-").at(-1) || "";
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: `${slug(product.fields.title)}-${product.sys.id}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(getEntryId((await params).id));
  if (!product) return {};
  return { title: `Products - ${product.fields.title}`, description: product.fields.description };
}

function ProductDetailContent({ product, tagNames }: { product: Product; tagNames: string[] }) {
  return (
    <PortfolioDetail
      title={product.fields.title}
      description={product.fields.description}
      image={product.fields.image?.fields}
      tags={tagNames}
      techStack={product.fields.techStack}
      url={product.fields.url}
      webStoreUrl={product.fields.webStoreUrl}
      appStoreUrl={product.fields.appStoreUrl}
      googlePlayUrl={product.fields.googlePlayUrl}
      statistics={product.fields.statistics}
    />
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const routeId = (await params).id;
  const entryId = getEntryId(routeId);
  const product = await getProduct(entryId);
  if (!product) notFound();

  const [landingPage, tags, relatedProducts] = await Promise.all([
    getProductLandingPage(entryId),
    getProjectTags(),
    getRelatedProducts(product.fields.category, product.sys.id),
  ]);
  const tagNames = product.metadata.tags
    .map((tag) => getTagNameById(tags.items, tag.sys.id))
    .filter((tag): tag is string => Boolean(tag));

  const category = getProductCategoryDetails(product.fields.category);
  if (!category) notFound();

  return (
    <>
      {landingPage ? (
        <ProductLandingPage
          product={product}
          landingPage={landingPage}
          productRouteId={routeId}
        />
      ) : (
        <ProductDetailContent product={product} tagNames={tagNames} />
      )}

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 md:px-0">
        {relatedProducts.length > 0 && (
          <ProductGrid
            products={relatedProducts}
            tags={tags}
            mobileScrollable
            heading={{ title: `Other ${category.title}` }}
          />
        )}
        <div className="mx-auto mt-8 w-full max-w-sm">
          <CtaButton asChild variant="outline" className="w-full">
            <Link href={`/products/${category.id}`}>
              View All {category.title}
            </Link>
          </CtaButton>
        </div>
      </section>
    </>
  );
}
