import { client } from ".";

interface Metadata {
  tags: MetadataTag[];
  concepts: string[];
}

export interface Project {
  fields: Fields;
  metadata: Metadata;
  sys: SysInfo;
}

interface Fields {
  title: string;
  description: string;
  date: string;
  image: Image;
  techStack: string[];
  url: string;
  appStoreUrl: string;
  googlePlayUrl: string;
  isPersonal: boolean;
}

interface Image {
  metadata: Metadata;
  sys: SysInfo;
  fields: ImageFields;
}

export interface ImageFields {
  title: string;
  description: string;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

interface SysInfo {
  id: string;
  type: string;
}

export interface MetadataTag {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export async function getProjects(isPersonal?: boolean) {
  const query = {
    content_type: "project",
    select: "fields, metadata.tags",
    order: "-fields.date",
    // Remove the 'where' object and directly use the field as a query parameter
    ...(typeof isPersonal !== "undefined" && {
      "fields.isPersonal": isPersonal,
    }),
  };

  const entries = await client.getEntries(query);

  if (entries.items) return entries.items;
  console.error(`Error getting entries`);
}

export async function getPersonalProjects() {
  return getProjects(true);
}

export async function getWorkRelatedProjects() {
  return getProjects(false);
}

export async function getTopTreeProjects() {
  const entries = await client.getEntries({
    content_type: "project",
    select: "fields, metadata.tags",
    order: "-fields.date",
    limit: 3,
  });
  if (entries.items) return entries.items;
  console.error(`Error getting top entries.`);
}

export async function getProject(id) {
  const entry = await client.getEntry(id);
  if (entry) {
    return entry;
  }
  console.error(`Error getting entry with ${id}.`);
}

