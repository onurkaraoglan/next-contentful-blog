"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "@onur/components/ui/section-heading";

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
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

      <div className="relative mx-auto max-w-7xl px-4 md:px-0" ref={containerRef}>
        <div className="relative rounded-3xl bg-background">
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
          <div className="relative pb-2 pl-2 pr-2 pt-2 md:pb-4 md:pl-4 md:pr-4 md:pt-4" ref={ref}>
            <div className="flex justify-center md:justify-start w-full md:gap-10">
              <div className="w-full">
                <Accordion.Root
                  type="multiple"
                  className="w-full divide-y divide-border"
                >
                  {items.map((item) => {
                    const dateParts: string[] = [];
                    if (item.startDate) dateParts.push(item.startDate);
                    if (item.endDate) dateParts.push(item.endDate);
                    const date = dateParts.length
                      ? dateParts.join(" — ")
                      : undefined;

                    return (
                      <Accordion.Item
                        key={item.id}
                        value={item.id}
                        className="group overflow-hidden"
                      >
                        <Accordion.Trigger className="w-full">
                          <div className="flex items-center justify-between gap-4 px-4 py-4">
                            <div className="flex items-center gap-3 min-w-0 text-left">
                              {item.logoSrc ? (
                                <Image
                                  src={item.logoSrc}
                                  alt={`${item.organization} logo`}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-full border bg-muted object-cover bg-white"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full border bg-muted flex items-center justify-center text-sm font-semibold">
                                  {(item.organization || "?").charAt(0)}
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-left">
                                  {item.organization}
                                </div>
                                <div className="text-xs text-muted-foreground truncate text-left">
                                  {item.roleOrDegree}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {date && (
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  {date}
                                </div>
                              )}
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                          </div>
                        </Accordion.Trigger>
                        <Accordion.Content className="px-4 pb-4 text-sm text-muted-foreground overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                          {item.description && (
                            <p className="mt-2 leading-relaxed">
                              {renderEmphasis(item.description)}
                            </p>
                          )}
                          {item.bullets && item.bullets.length > 0 && (
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                              {item.bullets.map((b, idx) => (
                                <li key={`${item.id}-b-${idx}`}>{renderEmphasis(b)}</li>
                              ))}
                            </ul>
                          )}
                          {item.tech && item.tech.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.tech.map((t) => (
                                <span
                                  key={`${item.id}-t-${t}`}
                                  className="px-2 py-1 rounded-md border text-xs bg-muted/30"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </Accordion.Content>
                      </Accordion.Item>
                    );
                  })}
                </Accordion.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;
