"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./section-heading";

export type TimelineEntry = {
  id: string;
  title: string;
  description: string;
  date?: string;
  content: React.ReactNode;
};

type TimelineProps = {
  data: TimelineEntry[];
  heading?: {
    title: string;
    subTitle?: string;
  };
  className?: string;
  actionButton?: React.ReactNode;
};

export const Timeline = ({
  data,
  heading,
  className,
  actionButton,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height - 40);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={`w-full font-sans ${className || ""}`} ref={containerRef}>
      {heading && (
        <SectionHeading title={heading.title} subTitle={heading.subTitle} />
      )}
      <div className="relative mx-auto max-w-7xl">
        <div className="hidden md:block relative rounded-3xl bg-background">
          <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
          <div ref={ref} className="relative pb-20 pl-8 pr-8 pt-8">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-center md:justify-start pt-10 md:gap-10 md:pt-20 w-full"
              >
                <div className="sticky top-40 z-40 hidden md:flex max-w-xs flex-col self-start md:w-full lg:max-w-sm">
                  <div className="absolute -left-[54px] md:-left-[54px] flex h-10 w-10 items-center justify-center rounded-full bg-card z-10">
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-[#1ca0fb] via-[#7b61ff] to-[#00ccb1] dark:from-pink-500 dark:via-purple-500 dark:to-cyan-500"></div>
                    <div className="relative bg-card rounded-full h-10 w-10 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-200px" }}
                    className="md:pl-14"
                  >
                    <h3 className="text-xl font-bold text-foreground md:text-2xl lg:text-3xl pb-3 leading-tight">
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className="text-xs font-normal text-muted-foreground mt-1">
                        {item.date}
                      </p>
                    )}
                  </motion.div>
                </div>

                <div className="relative w-full md:w-full md:pl-4 md:pr-4 flex flex-col items-center md:items-start">
                  <div className="mb-8 block md:hidden text-center">
                    <h3 className="text-xl font-bold text-foreground pb-3 leading-tight">
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className="text-xs font-normal text-muted-foreground mt-1">
                        {item.date}
                      </p>
                    )}
                  </div>
                  {item.content}
                </div>
              </div>
            ))}

            <div
              style={{
                height: height + "px",
              }}
              className="hidden md:block absolute left-0 top-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] -translate-x-1/2"
            >
              <motion.div
                style={{
                  height: heightTransform,
                  opacity: opacityTransform,
                }}
                className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
              />
            </div>
          </div>

          {actionButton && (
            <div className="pb-8 px-8 flex justify-start gap-10">
              <div className="flex max-w-xs w-full lg:max-w-sm"></div>
              <div className="flex-1 pl-4">
                <div className="max-w-2xl">{actionButton}</div>
              </div>
            </div>
          )}
        </div>

        <div className="block md:hidden px-4">
          {data.map((item, index) => (
            <div key={`mobile-${item.id}`}>
              <div className="pt-10 first:pt-0">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground pb-3 leading-tight">
                    {item.title}
                  </h3>
                  {item.date && (
                    <p className="text-xs font-normal text-muted-foreground mt-1">
                      {item.date}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">{item.content}</div>
              </div>

              {index < data.length - 1 && (
                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent h-[1px] w-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {actionButton && (
            <div className="pt-8 flex justify-center">{actionButton}</div>
          )}
        </div>
      </div>
    </div>
  );
};
