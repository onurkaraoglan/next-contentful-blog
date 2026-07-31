import type { Metadata } from "next";
import { notFound } from "next/navigation";
import slug from "slug";
import { getProduct, getProducts } from "@onur/data/api/product";
import { getProjectTags } from "@onur/data/api/tag";
import { getTagNameById } from "@onur/lib/tag";
import PortfolioDetail from "@onur/components/PortfolioDetail";

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

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(getEntryId((await params).id));
  if (!product) notFound();

  const tags = await getProjectTags();
  const tagNames = product.metadata.tags
    .map((tag) => getTagNameById(tags.items, tag.sys.id))
    .filter((tag): tag is string => Boolean(tag));

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
