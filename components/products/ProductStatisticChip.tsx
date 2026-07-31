import type { ProductStatistic } from "@onur/data/api/product";
import DynamicLucideIcon from "./DynamicLucideIcon";

export function ProductStatisticChip({
  statistic,
}: {
  statistic: ProductStatistic;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1.5 text-xs">
      <DynamicLucideIcon name={statistic.fields.icon} className="h-4 w-4" />
      <span className="font-semibold text-foreground">
        {statistic.fields.value}
      </span>
      <span className="text-muted-foreground">{statistic.fields.label}</span>
    </div>
  );
}
