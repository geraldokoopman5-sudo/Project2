export function matchesSearch(item, query, fields) {
  const term = query.trim().toLowerCase();
  if (!term) return true;

  return fields.some((field) => {
    const value = typeof field === "function" ? field(item) : item[field];
    return String(value ?? "").toLowerCase().includes(term);
  });
}
