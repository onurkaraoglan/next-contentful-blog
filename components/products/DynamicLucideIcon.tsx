"use client";

import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import type { LucideProps } from "lucide-react";
import { memo, type ComponentType } from "react";

type IconName = keyof typeof dynamicIconImports;

const iconCache = new Map<IconName, ComponentType<LucideProps>>();

function resolveIcon(name: string): ComponentType<LucideProps> {
  const normalizedName = (typeof name === "string" ? name.trim().toLowerCase() : "") as IconName;
  const iconName = normalizedName in dynamicIconImports
    ? normalizedName
    : ("circle-help" as IconName);

  const cachedIcon = iconCache.get(iconName);
  if (cachedIcon) return cachedIcon;

  const Icon = dynamic(dynamicIconImports[iconName], {
    loading: () => <span className="inline-block h-4 w-4" aria-hidden="true" />,
  }) as ComponentType<LucideProps>;

  iconCache.set(iconName, Icon);
  return Icon;
}

function DynamicLucideIcon({ name, ...props }: LucideProps & { name: string }) {
  const Icon = resolveIcon(name);
  return <Icon aria-hidden="true" {...props} />;
}

export default memo(DynamicLucideIcon);
