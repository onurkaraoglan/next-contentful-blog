"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@onur/components/ui/section-heading";
import { TIMELINE_LAYOUT_WIDTH } from "@onur/components/ui/timeline";

export type ResumeItem = {
  id: string;
  roleOrDegree: string;
  organization: string;
  logoSrc?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  bullets?: string[];
  tech?: string[];
};

export type ResumeSectionProps = {
  heading: {
    title: string;
    subTitle?: string;
  };
  items: ResumeItem[];
  className?: string;
};

export function ResumeSection({
  heading,
  items,
  className,
}: ResumeSectionProps) {
  const renderEmphasis = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        const content = part.slice(2, -2);
        return (
          <strong key={`b-${idx}`}>{content}</strong>
        );
      }
      return <span key={`t-${idx}`}>{part}</span>;
    });
  };
  return (
    <section className={className || ""}>
      <SectionHeading title={heading.title} subTitle={heading.subTitle} />

      <div className={`relative mx-auto w-full px-4 md:px-0 ${TIMELINE_LAYOUT_WIDTH}`}>
        <Accordion.Root type="multiple" className="space-y-0">
          {items.map((item) => {
            const dateParts: string[] = [];
            if (item.startDate) dateParts.push(item.startDate);
            if (item.endDate) dateParts.push(item.endDate);
            const date = dateParts.length
              ? dateParts.join(" - ")
              : undefined;

            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="group grid grid-cols-1 md:grid-cols-[8rem_1.5rem_minmax(0,1fr)] md:gap-x-6"
              >
                <time className="hidden pt-5 text-right text-xs font-medium text-muted-foreground md:block">
                  {date}
                </time>

                <div className="relative hidden justify-center md:flex">
                  <div className="absolute inset-y-0 w-px bg-border" />
                  <div className="relative mt-5 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground ring-1 ring-border" />
                </div>

                <div className="relative pb-5 md:pb-7">
                  <div className="absolute bottom-0 left-[5px] top-0 w-px bg-border md:hidden" />
                  <div className="absolute left-0 top-5 h-[11px] w-[11px] rounded-full border-2 border-background bg-foreground ring-1 ring-border md:hidden" />

                  <div className="pl-7 md:pl-0">
                    {date && (
                      <time className="mb-3 inline-flex rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground md:hidden">
                        {date}
                      </time>
                    )}

                    <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm transition-all duration-300 group-data-[state=open]:shadow-md">
                      <Accordion.Trigger className="w-full text-left outline-none">
                        <div className="flex items-center justify-between gap-4 px-4 py-4">
                          <div className="flex min-w-0 items-center gap-3">
                            {item.logoSrc ? (
                              <Image
                                src={item.logoSrc}
                                alt={`${item.organization} logo`}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full border bg-white object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                                {(item.organization || "?").charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="truncate font-semibold">
                                {item.organization}
                              </div>
                              <div className="truncate text-sm text-muted-foreground">
                                {item.roleOrDegree}
                              </div>
                              {item.location && (
                                <div className="truncate text-xs text-muted-foreground md:hidden">
                                  {item.location}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.location && (
                              <span className="hidden max-w-32 truncate text-xs text-muted-foreground md:inline">
                                {item.location}
                              </span>
                            )}
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </div>
                        </div>
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden border-t border-border/70 px-4 pb-4 text-sm text-foreground/75 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        {item.description && (
                          <p className="mt-4 leading-relaxed">
                            {renderEmphasis(item.description)}
                          </p>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-3 list-disc space-y-1 pl-5">
                            {item.bullets.map((b, idx) => (
                              <li key={`${item.id}-b-${idx}`}>
                                {renderEmphasis(b)}
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.tech && item.tech.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.tech.map((t) => (
                              <span
                                key={`${item.id}-t-${t}`}
                                className="rounded-md border bg-muted/30 px-2 py-1 text-xs"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          )}
                      </Accordion.Content>
                    </div>
                  </div>
                </div>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
}

export default ResumeSection;
