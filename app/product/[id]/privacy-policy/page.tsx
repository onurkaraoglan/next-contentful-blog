import { notFound } from "next/navigation";
import slug from "slug";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@onur/data/api/product";
import {
  getProductLandingPage,
  hasContentfulRichTextContent,
} from "@onur/data/api/product-landing-page";
import ProductLandingLegalPage from "@onur/components/products/ProductLandingLegalPage";

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

  if (!product) {
    return {};
  }

  return {
    title: `${product.fields.title} - Privacy Policy`,
    description: `Privacy policy for ${product.fields.title}`,
  };
}

export default async function ProductPrivacyPolicyPage({ params }: Props) {
  const routeId = (await params).id;
  const entryId = getEntryId(routeId);
  const product = await getProduct(entryId);

  if (!product) {
    notFound();
  }

  const landingPage = await getProductLandingPage(entryId);

  if (!landingPage || !hasContentfulRichTextContent(landingPage.fields.privacyPolicy)) {
    notFound();
  }

  return (
    <ProductLandingLegalPage
      product={product}
      productRouteId={routeId}
      title="Privacy Policy"
      content={landingPage.fields.privacyPolicy}
    />
  );
}
