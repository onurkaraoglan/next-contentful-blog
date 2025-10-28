import { Search } from "lucide-react";
import { cn } from "@onur/lib/utils";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn("relative mx-auto max-w-7xl", className)}>
      <div className="relative md:rounded-3xl md:bg-background py-20">
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#1ca0fb]/20 via-[#7b61ff]/20 via-50% to-[#00ccb1]/20 dark:from-pink-500 dark:via-purple-500 dark:via-50% dark:to-cyan-500 dark:opacity-20"></div>
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-20"></div>
            <div className="relative rounded-full bg-secondary p-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <p className="text-xl font-semibold text-foreground mb-3">
            Nothing here yet! 🌟
          </p>
          <p className="text-sm text-muted-foreground max-w-md text-center px-4">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
