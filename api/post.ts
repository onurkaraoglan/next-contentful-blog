import { accessToken, space } from "./keys";

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchEntries() {
  const entries = await client.getEntries({
    content_type: "blog",
    select:
      "fields.title,fields.description,fields.date,fields.languages,fields.image,metadata.tags",
    order: "-fields.date",
  });
  if (entries.items) return entries.items;
}

export async function fetchTopTreeEntries() {
  const entries = await client.getEntries({
    content_type: "blog",
    select:
      "fields.title,fields.description,fields.date,fields.languages,fields.image,metadata.tags",
    order: "-fields.date",
    limit: 3,
  });
  if (entries.items) return entries.items;
}

export async function fetchEntry(id) {
  try {
    const entry = await client.getEntry(id);
    return entry;
  } catch (error) {
    console.error(`Error fetching entry with id ${id}:`, error);
    throw new Error('The resource could not be found.');
  }
}

export async function fetchTags() {
  const entry = await client.getTags();
  if (entry) {
    return entry;
  }
}
