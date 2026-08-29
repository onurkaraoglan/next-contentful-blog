import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { client } from ".";
import type { Product } from "./product";
import type { ImageFields } from "./project";

export interface ProductLandingPageFaqItem {
  question: string;
  answer: string;
}

export interface ProductLandingPage {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    productName: string;
    product: Product;
    title: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    primaryCtaUrl?: string;
    logo?: {
      fields: ImageFields;
    };
    heroImage?: {
      fields: ImageFields;
    };
    faqItems?: unknown;
    privacyPolicy?: unknown;
    privacyPolicyIsActive?: boolean;
    termsAndConditions?: unknown;
    termsAndConditionsIsActive?: boolean;
  };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseProductLandingPageFaqItems(
  value: unknown
): ProductLandingPageFaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (
      item &&
      typeof item === "object" &&
      isNonEmptyString((item as { question?: unknown }).question) &&
      isNonEmptyString((item as { answer?: unknown }).answer)
    ) {
      return [
        {
          question: (item as { question: string }).question.trim(),
          answer: (item as { answer: string }).answer.trim(),
        },
      ];
    }

    return [];
  });
}

export function hasContentfulRichTextContent(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = (value as { content?: unknown }).content;
  return Array.isArray(content) && content.length > 0;
}

export function hasActivePrivacyPolicy(landingPage: ProductLandingPage): boolean {
  return (
    landingPage.fields.privacyPolicyIsActive !== false &&
    hasContentfulRichTextContent(landingPage.fields.privacyPolicy)
  );
}

export function hasActiveTermsAndConditions(
  landingPage: ProductLandingPage
): boolean {
  return (
    landingPage.fields.termsAndConditionsIsActive !== false &&
    hasContentfulRichTextContent(landingPage.fields.termsAndConditions)
  );
}

export function renderContentfulRichText(value: unknown) {
  if (!hasContentfulRichTextContent(value)) {
    return null;
  }

  return documentToReactComponents(value as never, {
    renderNode: {
      [BLOCKS.HEADING_1]: (_, children) => (
        <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight first:mt-0 md:text-5xl">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="mt-10 text-3xl font-semibold leading-tight tracking-tight first:mt-0 md:text-4xl">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className="mt-8 text-2xl font-semibold leading-snug tracking-tight first:mt-0 md:text-3xl">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <h4 className="mt-7 text-xl font-semibold leading-snug tracking-tight first:mt-0 md:text-2xl">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (_, children) => (
        <h5 className="mt-6 text-lg font-semibold leading-snug tracking-tight first:mt-0 md:text-xl">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (_, children) => (
        <h6 className="mt-6 text-base font-semibold uppercase tracking-[0.14em] text-muted-foreground first:mt-0">
          {children}
        </h6>
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="mt-4 text-base leading-8 text-foreground/88 first:mt-0 md:text-[1.05rem]">
          {children}
        </p>
      ),
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-foreground/88 marker:text-foreground/50">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-foreground/88 marker:text-foreground/50">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (_, children) => (
        <blockquote className="mt-6 border-l-2 border-border/80 pl-5 italic text-foreground/72">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-border/70" />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-border/80 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
        >
          {children}
        </a>
      ),
    },
  });
}

export async function getProductLandingPage(
  productId: string
): Promise<ProductLandingPage | null> {
  try {
    const entries = await client.getEntries({
      content_type: "productLandingPage",
      include: 2,
      limit: 1,
      "fields.product.sys.id": productId,
    });

    return ((entries.items || [])[0] as ProductLandingPage | undefined) ?? null;
  } catch {
    return null;
  }
}
