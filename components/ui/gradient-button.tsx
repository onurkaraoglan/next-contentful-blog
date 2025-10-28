import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@onur/lib/utils";

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "filled" | "outline";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    { className, asChild = false, variant = "filled", children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "outline") {
      return (
        <div className="relative group">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-cyan-600 transition-all duration-300"></div>

          <Comp
            className={cn(
              "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-background text-foreground hover:bg-accent",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </Comp>
        </div>
      );
    }

    return (
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 hover:shadow-lg",
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
GradientButton.displayName = "GradientButton";

export { GradientButton };
