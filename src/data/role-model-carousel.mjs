export const cardsPerPageForWidth = (width) => {
  if (width <= 750) return 1;
  if (width <= 1032) return 2;
  return 3;
};

export const chunkCards = (items, size) => {
  if (size < 1) throw new RangeError("Chunk size must be at least 1");

  const pages = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
};
