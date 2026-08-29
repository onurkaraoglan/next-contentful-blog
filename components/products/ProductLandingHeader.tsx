"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ImageFields } from "@onur/data/api/project";
import ProductLandingMobileMenu from "./ProductLandingMobileMenu";
import ProductLandingThemeToggle from "./ProductLandingThemeToggle";

type ProductLandingHeaderProps = {
  productRouteId: string;
  productName: string;
  title: string;
  logo?: ImageFields;
  hasFaq: boolean;
  hasPrivacyPolicy: boolean;
  hasTermsAndConditions: boolean;
  mode: "landing" | "legal";
};

function HeaderLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {label}
    </Link>
  );
}

export default function ProductLandingHeader({
  productRouteId,
  productName,
  title,
  logo,
  hasFaq,
  hasPrivacyPolicy,
  hasTermsAndConditions,
  mode,
}: ProductLandingHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 8) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const faqHref = mode === "landing" ? "#faq" : `/product/${productRouteId}#faq`;
  const supportHref =
    mode === "landing" ? "#support" : `/product/${productRouteId}#support`;
  const contactHref =
    mode === "landing" ? "#contact" : `/product/${productRouteId}#contact`;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 md:px-8 md:pt-6">
        <header
          className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background/88 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur md:px-6"
        >
          <Link href={`/product/${productRouteId}`} className="min-w-0 shrink">
            {logo?.file?.url ? (
              <span className="relative block h-10 w-[9rem] md:h-12 md:w-[140px]">
                <Image
                  src={`https:${logo.file.url}`}
                  alt={logo.description || title}
                  fill
                  sizes="(min-width: 768px) 140px, 144px"
                  className="object-contain object-left"
                  unoptimized
                />
              </span>
            ) : (
              <span className="block truncate text-lg font-semibold tracking-tight">
                {productName}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            <ProductLandingThemeToggle />
            <ProductLandingMobileMenu
              hasFaq={hasFaq}
              hasPrivacyPolicy={hasPrivacyPolicy}
              hasTermsAndConditions={hasTermsAndConditions}
              productRouteId={productRouteId}
              mode={mode}
            />
          </div>

          <nav className="hidden items-center gap-x-5 gap-y-3 md:flex md:justify-end">
            {hasFaq && <HeaderLink href={faqHref} label="FAQ" />}
            <HeaderLink href={supportHref} label="Support" />
            <HeaderLink href={contactHref} label="Contact" />
            {hasPrivacyPolicy && (
              <HeaderLink
                href={`/product/${productRouteId}/privacy-policy`}
                label="Privacy Policy"
              />
            )}
            {hasTermsAndConditions && (
              <HeaderLink
                href={`/product/${productRouteId}/terms-and-conditions`}
                label="Terms & Conditions"
              />
            )}
            <ProductLandingThemeToggle />
          </nav>
        </header>
      </div>
    </div>
  );
}
