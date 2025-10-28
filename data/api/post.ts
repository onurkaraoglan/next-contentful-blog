import { client } from ".";

export interface MetadataTag {
  sys: {
    type: "Link";
    linkType: string;
    id: string;
  };
}

interface Metadata {
  tags: MetadataTag[];
  concepts: string[];
}

interface SysLink {
  type: "Link";
  linkType: string;
  id: string;
}

interface SysEnvironment {
  sys: SysLink & { id: "master" };
}

interface SysInfo {
  space: { sys: SysLink };
  id: string;
  type: "Asset" | "Entry";
  createdAt: string;
  updatedAt: string;
  environment: SysEnvironment;
  publishedVersion: number;
  revision: number;
  contentType?: {
    sys: SysLink & { id: string };
  };
  locale: string;
}

interface ImageDetails {
  size: number;
  image: {
    width: number;
    height: number;
  };
}

interface ImageFile {
  url: string;
  details: ImageDetails;
  fileName: string;
  contentType: string;
}

export interface ImageFields {
  title: string;
  description: string;
  file: ImageFile;
}

interface Image {
  metadata: Metadata;
  sys: SysInfo;
  fields: ImageFields;
}

interface Hyperlink {
  nodeType: "hyperlink";
  content: TextNode[];
  data: {
    uri: string;
  };
}

interface TextNode {
  nodeType: "text";
  value: string;
  marks: any[];
  data: object;
}

interface Paragraph {
  nodeType: "paragraph";
  content: (TextNode | Hyperlink)[];
  data: object;
}

interface UnorderedList {
  nodeType: "unordered-list";
  content: ListItem[];
  data: object;
}

interface ListItem {
  nodeType: "list-item";
  content: Paragraph[];
  data: object;
}

interface EmbeddedAssetBlock {
  nodeType: "embedded-asset-block";
  content: any[];
  data: {
    target: Image;
  };
}

type BodyContent = Paragraph | UnorderedList | EmbeddedAssetBlock;

interface Body {
  nodeType: "document";
  data: object;
  content: BodyContent[];
}

interface Fields {
  title: string;
  description: string;
  date: string;
  image: Image;
  body?: Body;
  languages: string[];
}

export interface Post {
  metadata: Metadata;
  sys: SysInfo;
  fields: Fields;
}

export async function getPosts() {
  const entries = await client.getEntries({
    content_type: "blog",
    select:
      "fields.title, fields.description, fields.date, fields.languages, fields.image, metadata.tags",
    order: "-fields.date",
  });
  if (entries.items) return entries.items;
  console.error(`Error getting entries `);
}

export async function getTopTreePosts() {
  const entries = await client.getEntries({
    content_type: "blog",
    select:
      "fields.title, fields.description, fields.date, fields.languages, fields.image, metadata.tags",
    order: "-fields.date",
    limit: 3,
  });
  if (entries.items) return entries.items;
  console.error(`Error getting top entries.`);
}

export async function getPost(id) {
  const entry = await client.getEntry(id);
  if (entry) {
    return entry;
  }
  console.error(`Error getting entry with ${id}.`);
}

