import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Medium,
  Github,
  Envelope,
} from "react-bootstrap-icons";
import type { ReactNode } from "react";
import type { Product } from "@onur/data/api/product";
import {
  parseProductLandingPageFaqItems,
  type ProductLandingPage,
} from "@onur/data/api/product-landing-page";
import CtaButton from "@onur/components/ui/cta-button";
import ProductLandingFaq from "./ProductLandingFaq";
import ProductLandingThemeToggle from "./ProductLandingThemeToggle";

function ScrollNavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {label}
    </a>
  );
}

function LandingSocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-colors duration-300 hover:bg-foreground/[0.1] md:h-16 md:w-16"
    >
      {icon}
    </Link>
  );
}

export default function ProductLandingPage({
  product,
  landingPage,
  productRouteId,
}: {
  product: Product;
  landingPage: ProductLandingPage;
  productRouteId: string;
}) {
  const faqItems = parseProductLandingPageFaqItems(landingPage.fields.faqItems);
  const hasFaq = faqItems.length > 0;
  const hasPrivacyPolicy = Boolean(landingPage.fields.privacyPolicy);
  const hasTermsAndConditions = Boolean(landingPage.fields.termsAndConditions);
  const logo = landingPage.fields.logo?.fields ?? product.fields.image?.fields;
  const heroImage = landingPage.fields.heroImage?.fields ?? product.fields.image?.fields;
  const hasPrimaryCta =
    Boolean(landingPage.fields.primaryCtaLabel) &&
    Boolean(landingPage.fields.primaryCtaUrl);

  return (
    <>
      <style>{`#global-dock{display:none}`}</style>

      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%)]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-24 pt-6 md:px-8 md:pb-32 md:pt-8">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Link href={`/product/${productRouteId}`} className="w-fit">
              {logo?.file?.url ? (
                <Image
                  src={`https:${logo.file.url}`}
                  alt={logo.description || landingPage.fields.title}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain md:h-12"
                  unoptimized
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight">
                  {landingPage.fields.productName}
                </span>
              )}
            </Link>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {hasFaq && <ScrollNavLink href="#faq" label="FAQ" />}
              <ScrollNavLink href="#contact" label="Contact" />
              {hasPrivacyPolicy && (
                <Link
                  href={`/product/${productRouteId}/privacy-policy`}
                  className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              )}
              {hasTermsAndConditions && (
                <Link
                  href={`/product/${productRouteId}/terms-and-conditions`}
                  className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              )}
              <ProductLandingThemeToggle />
            </nav>
          </header>

          <section className="grid flex-1 grid-cols-1 items-center gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_28rem]">
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                {landingPage.fields.title}
              </h1>
              {landingPage.fields.subtitle && (
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
                  {landingPage.fields.subtitle}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {hasPrimaryCta && (
                  <CtaButton asChild>
                    <Link href={landingPage.fields.primaryCtaUrl!}>
                      {landingPage.fields.primaryCtaLabel}
                    </Link>
                  </CtaButton>
                )}
                <CtaButton variant="outline" asChild>
                  <Link href="#contact">Get in Touch</Link>
                </CtaButton>
              </div>
            </div>

            {heroImage?.file?.url && (
              <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/60 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur">
                <Image
                  src={`https:${heroImage.file.url}`}
                  alt={heroImage.description || landingPage.fields.title}
                  width={896}
                  height={672}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            )}
          </section>

          {hasFaq && (
            <section id="faq" className="scroll-mt-24 py-12 md:py-16">
              <div className="mb-8 space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-center md:text-4xl">
                  FAQ
                </h2>
              </div>
              <ProductLandingFaq items={faqItems} />
            </section>
          )}

          <section id="contact" className="scroll-mt-24 py-12 md:py-16">
            <div className="relative overflow-hidden rounded-[2rem] px-2 py-6 md:px-0">

              <div className="mx-auto max-w-3xl text-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Contact
                  </h2>
                  <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Reach out directly for product questions, support, partnerships, or anything else
                    you&apos;d like to discuss.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <LandingSocialLink
                    href="mailto:okaraoglan91@gmail.com"
                    label="Email"
                    icon={<Envelope className="h-7 w-7 fill-current md:h-8 md:w-8" />}
                  />
                  <LandingSocialLink
                    href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                    label="LinkedIn"
                    icon={<Linkedin className="h-7 w-7 fill-current md:h-8 md:w-8" />}
                  />
                  <LandingSocialLink
                    href="https://github.com/onurkaraoglan"
                    label="GitHub"
                    icon={<Github className="h-7 w-7 fill-current md:h-8 md:w-8" />}
                  />
                  <LandingSocialLink
                    href="https://medium.com/@onurkaraoglan"
                    label="Medium"
                    icon={<Medium className="h-7 w-7 fill-current md:h-8 md:w-8" />}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
