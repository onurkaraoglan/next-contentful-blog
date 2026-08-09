"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ProductLandingPageFaqItem } from "@onur/data/api/product-landing-page";

export default function ProductLandingFaq({
  items,
}: {
  items: ProductLandingPageFaqItem[];
}) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((item, index) => (
        <Accordion.Item
          key={`${item.question}-${index}`}
          value={`faq-${index}`}
          className="overflow-hidden rounded-2xl border border-border/70 bg-background/80"
        >
          <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
            <span className="text-sm font-medium md:text-base">{item.question}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden border-t border-border/70 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
