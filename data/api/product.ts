import { client } from ".";
import type { ImageFields, MetadataTag } from "./project";

export const PRODUCT_CATEGORIES = [
  "extensions",
  "mobile-apps",
  "web-apps",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface ProductStatistic {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    value: string;
    label: string;
    icon: string;
  };
}

export interface Product {
  sys: {
    id: string;
    type: string;
    contentType?: {
      sys: {
        id: string;
      };
    };
  };
  metadata: {
    tags: MetadataTag[];
  };
  fields: {
    title: string;
    description: string;
    date: string;
    image: {
      fields: ImageFields;
    };
    techStack: string[];
    url?: string;
    webStoreUrl?: string;
    appStoreUrl?: string;
    googlePlayUrl?: string;
    category: ProductCategory;
    statistics?: ProductStatistic[];
  };
}

export async function getProducts(category?: ProductCategory): Promise<Product[]> {
  try {
    const entries = await client.getEntries({
      content_type: "product",
      select: "fields,metadata.tags",
      order: "-fields.date",
      include: 2,
      ...(category && { "fields.category": category }),
    });

    return (entries.items || []) as unknown as Product[];
  } catch {
    return [];
  }
}

export async function getLatestProducts(): Promise<Product[]> {
  try {
    const entries = await client.getEntries({
      content_type: "product",
      select: "fields,metadata.tags",
      order: "-fields.date",
      include: 2,
      limit: 3,
    });

    return (entries.items || []) as unknown as Product[];
  } catch {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const entry = await client.getEntry(id, { include: 2 });
    const contentType = entry.sys.contentType?.sys.id;

    if (contentType !== "product") return null;
    return entry as unknown as Product;
  } catch {
    return null;
  }
}
