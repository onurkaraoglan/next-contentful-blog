import { notFound, redirect } from "next/navigation";
import slug from "slug";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@onur/data/api/product";
import {
  getProductLandingPage,
  hasActivePrivacyPolicy,
} from "@onur/data/api/product-landing-page";
import ProductLandingLegalPage from "@onur/components/products/ProductLandingLegalPage";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 600;

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
  const routeId = (await params).id;
  const entryId = getEntryId(routeId);
  const product = await getProduct(entryId);

  if (!product) {
    return {};
  }

  const landingPage = await getProductLandingPage(entryId);
  const faviconUrl = landingPage?.fields.logo?.fields.file?.url;
  const baseTitle = landingPage?.fields.title || product.fields.title;

  if (!landingPage || !hasActivePrivacyPolicy(landingPage)) {
    return {};
  }

  return {
    title: `${baseTitle} - Privacy Policy`,
    description: `Privacy policy for ${product.fields.title}`,
    ...(faviconUrl
      ? {
          icons: {
            icon: `https:${faviconUrl}`,
          },
        }
      : {}),
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

  if (!landingPage || !hasActivePrivacyPolicy(landingPage)) {
    redirect(`/product/${routeId}`);
  }

  return (
    <ProductLandingLegalPage
      product={product}
      landingPage={landingPage}
      productRouteId={routeId}
      title="Privacy Policy"
      content={landingPage.fields.privacyPolicy}
    />
  );
}
