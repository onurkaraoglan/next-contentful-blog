import Link from "next/link";
import type { Product } from "@onur/data/api/product";
import {
  parseProductLandingPageFaqItems,
  type ProductLandingPage,
  renderContentfulRichText,
} from "@onur/data/api/product-landing-page";
import CtaButton from "@onur/components/ui/cta-button";
import ProductLandingHeader from "./ProductLandingHeader";

export default function ProductLandingLegalPage({
  product,
  landingPage,
  productRouteId,
  title,
  content,
}: {
  product: Product;
  landingPage: ProductLandingPage;
  productRouteId: string;
  title: string;
  content: unknown;
}) {
  const body = renderContentfulRichText(content);
  const logo = landingPage.fields.logo?.fields ?? product.fields.image?.fields;
  const hasFaq = parseProductLandingPageFaqItems(landingPage.fields.faqItems).length > 0;
  const hasPrivacyPolicy = Boolean(landingPage.fields.privacyPolicy);
  const hasTermsAndConditions = Boolean(landingPage.fields.termsAndConditions);

  return (
    <>
      <style>{`#global-dock{display:none}`}</style>

      <div className="min-h-screen bg-background">
        <ProductLandingHeader
          productRouteId={productRouteId}
          productName={landingPage.fields.productName}
          title={landingPage.fields.title}
          logo={logo}
          hasFaq={hasFaq}
          hasPrivacyPolicy={hasPrivacyPolicy}
          hasTermsAndConditions={hasTermsAndConditions}
          mode="legal"
        />

        <div className="mx-auto flex w-full max-w-4xl flex-col px-4 pb-24 pt-28 md:px-8 md:pb-32 md:pt-32">

          <div className="rounded-[2rem] border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur md:p-12">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Legal
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
            </div>

            <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
              {body}
            </div>

            <div className="mt-10">
              <CtaButton asChild variant="outline">
                <Link href={`/product/${productRouteId}`}>Back to Product</Link>
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
