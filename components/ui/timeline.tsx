"use client";

import dayjs from "dayjs";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "./section-heading";

export const TIMELINE_CONTENT_WIDTH = "max-w-2xl";
export const TIMELINE_LAYOUT_WIDTH = "max-w-[54.5rem] lg:-translate-x-[4.75rem]";

export type TimelineEntry = {
  id: string;
  date?: string;
  content: ReactNode;
};

type TimelineProps = {
  data: TimelineEntry[];
  heading?: {
    title: string;
    subTitle?: string;
  };
  className?: string;
  actionButton?: ReactNode;
};

function formatDate(date?: string) {
  if (!date) return "";
  const parsedDate = dayjs(date);
  return parsedDate.isValid() ? parsedDate.format("MMM D, YYYY") : date;
}

export const Timeline = ({ data, heading, className, actionButton }: TimelineProps) => {
  const reduceMotion = useReducedMotion();
  const sortedData = [...data].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });

  return (
    <div className={`w-full font-sans ${className || ""}`}>
      {heading && <SectionHeading title={heading.title} subTitle={heading.subTitle} />}

      <div className={`relative mx-auto w-full ${TIMELINE_LAYOUT_WIDTH}`}>
        {sortedData.map((item) => (
          <motion.article
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-[8rem_1.5rem_minmax(0,1fr)] md:gap-x-6"
          >
            <time
              dateTime={item.date}
              className="hidden pt-1 text-right text-xs font-medium tracking-wide text-muted-foreground md:block"
            >
              {formatDate(item.date)}
            </time>

            <div className="relative hidden justify-center md:flex">
              <div className="absolute inset-y-0 w-px bg-border" />
              <div className="relative mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground ring-1 ring-border" />
            </div>

            <div className="relative pb-14 md:pb-16">
              <div className="absolute bottom-0 left-[5px] top-0 w-px bg-border md:hidden" />
              <div className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-background bg-foreground ring-1 ring-border md:hidden" />
              <div className="pl-7 md:pl-0">
                {item.date && (
                  <time
                    dateTime={item.date}
                    className="mb-3 inline-flex rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground md:hidden"
                  >
                    {formatDate(item.date)}
                  </time>
                )}
                <div className={`w-full ${TIMELINE_CONTENT_WIDTH}`}>{item.content}</div>
              </div>
            </div>
          </motion.article>
        ))}

        {actionButton && (
          <div className="grid grid-cols-1 md:grid-cols-[8rem_1.5rem_minmax(0,1fr)] md:gap-x-6">
            <div className="hidden md:block" />
            <div className="relative hidden justify-center md:flex">
              <div className="absolute inset-y-0 w-px bg-border" />
            </div>
            <div className="pl-7 md:pl-0">
              <div className={`w-full ${TIMELINE_CONTENT_WIDTH}`}>{actionButton}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
