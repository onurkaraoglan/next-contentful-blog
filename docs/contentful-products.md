# Contentful product setup

Create and publish these content types before deploying the frontend.

## Product Statistic (`productStatistic`)

| Field ID | Type | Required | Validation / help text |
| --- | --- | --- | --- |
| `value` | Short text | Yes | Example: `10K+` |
| `label` | Short text | Yes | Example: `Downloads` |
| `icon` | Short text | Yes | A kebab-case icon name from https://lucide.dev/icons/ |

The frontend validates `icon` against the icons included in the installed
`lucide-react` version. Unknown names render the `circle-help` fallback.

## Product (`product`)

| Field ID | Type | Required | Validation |
| --- | --- | --- | --- |
| `title` | Short text | Yes | Use as the entry title |
| `description` | Long text | Yes | — |
| `date` | Date and time | Yes | — |
| `image` | Media | Yes | Accept images only, one asset |
| `techStack` | Short text, list | No | — |
| `url` | Short text | No | URL pattern |
| `appStoreUrl` | Short text | No | URL pattern |
| `googlePlayUrl` | Short text | No | URL pattern |
| `category` | Short text | Yes | Predefined values: `extensions`, `mobile-apps`, `web-apps`; dropdown appearance |
| `statistics` | References, many | No | Accept only `Product Statistic`; zero to six entries |

Keep statistics in their desired display order in the reference list. Publish
the statistic entries before publishing the Product that references them.
Metadata tags may be copied from the corresponding personal Project entry.

## Migration order

1. Create and save `Product Statistic`.
2. Create and save `Product`.
3. Create and publish statistic entries.
4. Recreate each personal Project as a Product, reusing its assets, links,
   tech stack and metadata tags; then assign a category and statistics.
5. Publish the Product entries.
6. Leave legacy personal Project entries published if desired; the new frontend
   does not query or link to them.
