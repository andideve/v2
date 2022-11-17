function getUniqueTagsFromItems<T extends { tags?: string[] } = {}>(items: T[]) {
  return Array.from(new Set(items.map((e) => e.tags ?? []).flat()));
}

export default function TopicSearch<T extends { tags?: string[] } = {}>(items: T[]) {
  const allTags = getUniqueTagsFromItems(items);
  return {
    search(query: string[]) {
      return items.filter((item) => {
        if (!item.tags) return false;
        return query.every((q) => (item.tags as string[]).includes(q));
      });
    },
    getOptions(searchResults: T[], selectedTags: string[]) {
      const resultTags = getUniqueTagsFromItems(searchResults);
      return allTags.map((tag) => ({
        value: tag,
        selected: selectedTags.includes(tag),
        disabled: !resultTags.includes(tag),
      }));
    },
  };
}
