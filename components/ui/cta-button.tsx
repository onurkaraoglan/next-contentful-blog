import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@onur/lib/utils";

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "filled" | "outline";
}

const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    { className, asChild = false, variant = "filled", children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "outline") {
      return (
        <Comp
          className={cn(
            "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-border/70 bg-background px-8 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(
          "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-foreground bg-foreground px-8 text-sm font-medium text-background ring-offset-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
CtaButton.displayName = "CtaButton";

export default CtaButton ;
