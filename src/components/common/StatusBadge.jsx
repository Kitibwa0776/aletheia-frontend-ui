export default function StatusBadge({ value }) {
  const normalized = value?.toLowerCase() ?? "";
  const className =
    normalized.includes("critical")
      ? "badge danger"
      : normalized.includes("review")
      ? "badge warning"
      : normalized.includes("progress")
      ? "badge info"
      : "badge success";

  return <span className={className}>{value}</span>;
}
