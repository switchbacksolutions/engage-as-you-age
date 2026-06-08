/**
 * Converts a human-readable label (e.g. "Family Caregivers") into a
 * URL-safe slug (e.g. "family-caregivers"). Used to keep blog tags
 * readable in the UI while keeping their archive URLs clean and stable.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
