import { client } from ".";

export interface Tag {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: TagItem[];
}

interface TagItem {
  sys: {
    space: Link;
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: Link;
    createdBy: Link;
    updatedBy: Link;
    version: number;
    visibility: string;
  };
  name: string;
}

interface Link {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export async function getPostTags() {
  const entry = await client.getTags({
    "name[in]": [
      "Algorithms",
      "Self Improvement",
      "JavaScript",
      "English",
      "Türkçe",
    ],
  });
  if (entry) {
    return entry;
  }
  console.error(`Error getting tags .`);
}

export async function getProjectTags() {
  const entry = await client.getTags({
    "name[in]": [
      "Responsive Web App",
      "Android",
      "iOS",
      "Chrome Extension",
      "Full-Stack",
    ],
  });
  if (entry) {
    return entry;
  }
  console.error(`Error getting tags .`);
}

