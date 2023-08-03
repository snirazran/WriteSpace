export function countWords(str: string | undefined) {
  if (!str) return 0;
  str = str.replace(/<[^>]*>/g, ' ');

  const words = str
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '');

  return words.length;
}
