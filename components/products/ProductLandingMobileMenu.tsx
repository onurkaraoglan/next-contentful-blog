"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ProductLandingMobileMenuProps = {
  hasFaq: boolean;
  hasPrivacyPolicy: boolean;
  hasTermsAndConditions: boolean;
  productRouteId: string;
  mode: "landing" | "legal";
};

function DrawerLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const isAnchorLink = href.startsWith("#");

  if (isAnchorLink) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="text-lg font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
    >
      {label}
    </Link>
  );
}

export default function ProductLandingMobileMenu({
  hasFaq,
  hasPrivacyPolicy,
  hasTermsAndConditions,
  productRouteId,
  mode,
}: ProductLandingMobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);
  const faqHref = mode === "landing" ? "#faq" : `/product/${productRouteId}#faq`;
  const contactHref =
    mode === "landing" ? "#contact" : `/product/${productRouteId}#contact`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/6 text-foreground transition-colors duration-200 hover:bg-foreground/12"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="product-landing-mobile-drawer"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 md:hidden ${
                isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
              onClick={closeMenu}
              aria-hidden="true"
            />

            <aside
              id="product-landing-mobile-drawer"
              className={`fixed inset-y-0 right-0 z-[80] flex h-dvh w-[min(22rem,88vw)] flex-col bg-background px-6 pb-8 pt-6 transition-all duration-300 md:hidden ${
                isOpen
                  ? "visible translate-x-0 opacity-100 pointer-events-auto"
                  : "invisible translate-x-full opacity-0 pointer-events-none"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="flex items-center justify-end pb-5">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/6 text-foreground transition-colors duration-200 hover:bg-foreground/12"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-6">
                {hasFaq && <DrawerLink href={faqHref} label="FAQ" onClick={closeMenu} />}
                <DrawerLink href={contactHref} label="Contact" onClick={closeMenu} />
                {hasPrivacyPolicy && (
                  <DrawerLink
                    href={`/product/${productRouteId}/privacy-policy`}
                    label="Privacy Policy"
                    onClick={closeMenu}
                  />
                )}
                {hasTermsAndConditions && (
                  <DrawerLink
                    href={`/product/${productRouteId}/terms-and-conditions`}
                    label="Terms & Conditions"
                    onClick={closeMenu}
                  />
                )}
              </nav>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}
