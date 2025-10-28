export function getTagNameById(data, id) {
  const foundItem = data.find((item) => item.sys.id === id);
  return foundItem ? foundItem.name : null;
}

