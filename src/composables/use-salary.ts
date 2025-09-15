/**
 * This will convert numeric value into salary format.
 * @param salary to be converted
 * @param display default compact 12,345 -> 12K
 * @returns
 */

import type { TMinMax } from "@/interface/jobs.interface";

export function useSalary(
  salary: TMinMax,
  display: "compact" | "standard" = "compact"
) {
  const format = Intl.NumberFormat("en-in", {
    style: "currency",
    currency: "inr",
    notation: display,
  });

  let result;

  if (typeof salary === "string") {
    result = format.format(+salary);
  } else {
    let min = format.format(salary.min || 0);
    let max = format.format(salary.max || 0);
    result = `${min} - ${max}`;
  }

  result = result.replace("T", "K");
  return result;
}
