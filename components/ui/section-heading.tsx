import { cn } from "@onur/lib/utils";

type SectionHeadingProps = {
  title: string;
  subTitle?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subTitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mb-16">
      <h2
        className={cn(
          "text-center text-3xl md:text-4xl lg:text-5xl font-bold pb-2 relative bg-clip-text text-transparent bg-gradient-to-r from-neutral-900/80 via-neutral-800 to-neutral-900/80 dark:from-neutral-100/80 dark:via-white dark:to-neutral-100/80 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_1px_rgb(255_255_255_/_10%)]",
          className
        )}
      >
        {title}
      </h2>
      {subTitle && (
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          {subTitle}
        </p>
      )}
    </div>
  );
}

