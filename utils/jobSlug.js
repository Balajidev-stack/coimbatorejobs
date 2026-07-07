// Converts any string into a lowercase, hyphen-separated URL segment
export const slugify = (value) => {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// location fields are freeform ("City, Country" or just "City") - take the city part
const getCityFromLocation = (location) => {
  if (!location) return "";
  return location.split(",")[0];
};

// Builds the SEO slug for a job. Prefers a `slug` field if the source already
// provides one (e.g. a future backend API) so callers never need to change
// when the data source changes - only this function's fallback logic would.
export const getJobSlug = (job) => {
  if (!job) return "";
  if (job.slug) return job.slug;

  const title = slugify(job.jobTitle || job.title);
  const company = slugify(job.company || job.companyName);
  const city = slugify(job.city || getCityFromLocation(job.location));

  return [title, company, city].filter(Boolean).join("-");
};

// Canonical internal URL for a job's detail page
export const getJobUrl = (job) => `/jobs/${getJobSlug(job)}`;

// Finds a job in a given list whose generated slug matches the route param.
// Callers pass in the job list explicitly (rather than this module importing
// a specific data source) so the lookup keeps working unchanged once jobs
// come from a backend API instead of the static data file.
export const findJobBySlug = (slug, jobs) => {
  if (!slug || !Array.isArray(jobs)) return null;
  return jobs.find((job) => getJobSlug(job) === slug) || null;
};
