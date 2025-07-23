export function useSalary(
  value: number,
  display: "compact" | "standard" = "compact"
) {
  const format = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "inr",
    notation: display,
  });

  return format.format(value);
}
