import type { ProductCategory } from "@onur/data/api/product";

export type ProductCategoryDetails = {
  id: ProductCategory;
  title: string;
  description: string;
  icon: "puzzle" | "smartphone" | "globe";
};

export const productCategories: ProductCategoryDetails[] = [
  {
    id: "extensions",
    title: "Extensions",
    description: "Browser extensions that make everyday workflows simpler.",
    icon: "puzzle",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Mobile experiences for iOS and Android.",
    icon: "smartphone",
  },
  {
    id: "web-apps",
    title: "Web Apps",
    description: "Useful, responsive products built for the web.",
    icon: "globe",
  },
];

export function getProductCategoryDetails(category: ProductCategory) {
  return productCategories.find((item) => item.id === category);
}
