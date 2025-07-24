/**
 * This will convert numeric value into salary format.
 * @param value to be converted
 * @param display default compact 12,345 -> 12K
 * @returns 
 */

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
