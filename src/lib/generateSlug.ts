export function generateSlug(email: string) {
  return email
    .split("@")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
