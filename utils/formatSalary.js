// Formats a job's salary for display. Tolerant of two data shapes so pages
// never change when the backend migrates salary from a display string to a
// structured object:
//   1. Structured: job.salary = { min, max, currency, unit }
//   2. Legacy:     job.salary = "$35k - $45k" (freeform display string)
// Structured salary is always preferred. Falls back to the legacy string,
// then to an empty string so callers can hide the field entirely.

const isStructuredSalary = (salary) =>
  salary && typeof salary === "object" && !Array.isArray(salary);

// Formats a single amount using Intl when a currency code is available,
// otherwise returns the raw number as a string. Guarded so a missing or
// invalid currency never throws.
const formatAmount = (amount, currency) => {
  if (amount === undefined || amount === null || amount === "") return "";
  const num = Number(amount);
  if (Number.isNaN(num)) return String(amount);

  if (currency) {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(num);
    } catch {
      // Unknown currency code - fall through to a plain number.
    }
  }
  return new Intl.NumberFormat("en-IN").format(num);
};

// Normalizes a unit ("MONTH"/"month"/"YEAR"...) into a display suffix.
const formatUnit = (unit) => {
  if (!unit) return "";
  const map = {
    HOUR: "hour",
    HOURLY: "hour",
    DAY: "day",
    DAILY: "day",
    WEEK: "week",
    WEEKLY: "week",
    MONTH: "month",
    MONTHLY: "month",
    YEAR: "year",
    YEARLY: "year",
    ANNUM: "year",
  };
  const key = String(unit).toUpperCase().trim();
  return map[key] || String(unit).toLowerCase();
};

export const formatSalary = (job) => {
  const salary = job?.salary;

  // Legacy display string - return as-is.
  if (typeof salary === "string") return salary;

  if (isStructuredSalary(salary)) {
    const { min, max, currency, unit } = salary;
    const minStr = formatAmount(min, currency);
    const maxStr = formatAmount(max, currency);

    let range = "";
    if (minStr && maxStr) range = `${minStr} - ${maxStr}`;
    else range = minStr || maxStr || "";

    if (!range) return "";

    const unitStr = formatUnit(unit);
    return unitStr ? `${range} / ${unitStr}` : range;
  }

  return "";
};

export default formatSalary;
