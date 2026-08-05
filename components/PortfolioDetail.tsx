import Image from "next/image";
import { slugify } from "@onur/lib/string";
import type { ImageFields } from "@onur/data/api/project";
import type { ProductStatistic } from "@onur/data/api/product";
import { BackButton } from "@onur/components/ui/back-button";
import { ProductStatisticChip } from "@onur/components/products/ProductStatisticChip";

interface Props {
  title: string;
  description: string;
  image?: ImageFields;
  tags: string[];
  techStack?: string[];
  url?: string;
  webStoreUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  statistics?: ProductStatistic[];
}

export default function PortfolioDetail({
  title,
  description,
  image,
  tags,
  techStack = [],
  url,
  webStoreUrl,
  appStoreUrl,
  googlePlayUrl,
  statistics = [],
}: Props) {
  const src = image?.file?.url ? `https:${image.file.url}` : "";
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl items-center px-4 py-12 md:px-0 md:py-20">
      <BackButton />
      <article className="w-full overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm">
        <div className="grid w-full grid-cols-1 items-center gap-8 p-5 md:grid-cols-2 md:p-8">
          {src && image && (
            <div className="flex items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-lg border border-border/70 bg-muted">
                <Image src={src} alt={image.description || title} width={600} height={400} className="h-auto w-full object-cover" unoptimized />
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center h-full">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">{description}</p>

            <div className="space-y-4">
              {statistics.length > 0 && (
                <section className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <h2 className="mb-3 text-sm font-semibold">Statistics</h2>
                  <div className="flex flex-wrap gap-2">
                    {statistics.map((statistic) => (
                      <ProductStatisticChip key={statistic.sys.id} statistic={statistic} />
                    ))}
                  </div>
                </section>
              )}

              {tags.length > 0 && (
                <section className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <h2 className="mb-2 text-sm font-semibold">Tags</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-md bg-muted border border-border">{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              {techStack.length > 0 && (
                <section className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <h2 className="mb-2 text-sm font-semibold">Tech Stack</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((stack) => (
                      <div key={stack} className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted">
                        <Image
                          src={`/images/tech/${slugify(stack)}.svg`}
                          alt={stack}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                          unoptimized
                        />
                        <span>{stack}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {url && <ExternalButton href={url} label="Visit Website" />}
              {webStoreUrl && <ExternalButton href={webStoreUrl} label="Visit Extension Page" />}
              {appStoreUrl && <ExternalButton href={appStoreUrl} label="App Store" />}
              {googlePlayUrl && <ExternalButton href={googlePlayUrl} label="Google Play" />}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function ExternalButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md border border-border/70 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {label}
    </a>
  );
}
