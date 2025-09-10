export const highlightText = (text: string, query: string) => {
  if (!query) return text;

  // split query into multiple words (remove extra spaces)
  const words = query.trim().split(/\s+/);

  // build a regex for all words
  const regex = new RegExp(`(${words.join("|")})`, "gi");

  return text.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
};
