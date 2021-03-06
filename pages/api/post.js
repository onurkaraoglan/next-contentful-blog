const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

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
  console.log(`Error getting Entries for ${contentType.name}.`);
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
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function fetchEntry(id) {
  const entry = await client.getEntry(id);
  if (entry) {
    return entry;
  }
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function fetchTags() {
  const entry = await client.getTags();
  if (entry) {
    return entry;
  }
  console.log(`Error getting Entries for ${contentType.name}.`);
}
