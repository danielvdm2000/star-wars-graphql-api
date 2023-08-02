export function extractIdFromUrl(url: string): number {
  const match = url.match(/(\d+)\/?$/);

  if (!match) throw new Error(`Could not extract id from url: ${url}`);

  return parseInt(match[1], 10);
}
