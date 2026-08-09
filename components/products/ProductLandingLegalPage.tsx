import Link from "next/link";
import type { Product } from "@onur/data/api/product";
import {
  renderContentfulRichText,
} from "@onur/data/api/product-landing-page";
import CtaButton from "@onur/components/ui/cta-button";

export default function ProductLandingLegalPage({
  product,
  productRouteId,
  title,
  content,
}: {
  product: Product;
  productRouteId: string;
  title: string;
  content: unknown;
}) {
  const body = renderContentfulRichText(content);

  return (
    <>
      <style>{`#global-dock{display:none}`}</style>

      <div className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-4xl flex-col px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-12">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              href={`/product/${productRouteId}`}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Back to {product.fields.title}
            </Link>
          </div>

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
