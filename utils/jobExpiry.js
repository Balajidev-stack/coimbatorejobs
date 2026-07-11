// Null-safe helpers for a job's application deadline / expiry. The frontend
// does not compute expiry - it only consumes a date the backend provides.
// Reads `applicationDeadline` (preferred) or `validThrough`. Every helper
// returns null / false when no valid date exists so callers never render an
// incorrect or placeholder date.

// Returns a valid Date for the job's expiry, or null if none/invalid.
export const getExpiryDate = (job) => {
  const raw = job?.applicationDeadline ?? job?.validThrough;
  if (!raw) return null;

  const date = raw instanceof Date ? raw : new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
};

// True only when a valid expiry date exists and is in the past.
export const isExpired = (job) => {
  const date = getExpiryDate(job);
  if (!date) return false;
  return date.getTime() < Date.now();
};

// Formats the expiry date for display, or "" when unavailable.
export const formatExpiryDate = (job) => {
  const date = getExpiryDate(job);
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return "";
  }
};

export default getExpiryDate;
