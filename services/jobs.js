// Server-side helper for the sitemap. Fetches the backend-curated list of
// sitemap-eligible jobs (backend already filters to published, non-expired,
// valid-slug jobs) and validates only the basic response shape. Never throws:
// returns [] on any failure so the sitemap can still emit its static entries.
//
// The backend base URL comes from API_BASE_URL (server-only env var). It is
// intentionally NOT NEXT_PUBLIC_* because this request only ever runs on the
// server (inside app/sitemap.js) and must never reach the browser.

const SITEMAP_ENDPOINT = "/api/v1/employer-dashboard/jobs/sitemap";

// Basic validation of a single job entry. The backend owns eligibility; we
// only guard against malformed rows that would break URL generation.
const isValidJob = (job) =>
  job &&
  typeof job === "object" &&
  typeof job.slug === "string" &&
  job.slug.trim().length > 0;

export const getSitemapJobs = async () => {
  const base = process.env.API_BASE_URL;

  // No backend configured (e.g. local build without the env var). Fail safe:
  // the sitemap still renders its static entries. Reported as a config need.
  if (!base) {
    console.warn(
      "[sitemap] API_BASE_URL is not set — serving static sitemap entries only."
    );
    return [];
  }

  const url = `${base.replace(/\/$/, "")}${SITEMAP_ENDPOINT}`;

  try {
    // Revalidate hourly so the sitemap stays in sync with backend changes.
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`[sitemap] Job API responded ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!data?.success || !Array.isArray(data.jobs)) {
      console.error("[sitemap] Job API returned an unexpected response shape.");
      return [];
    }

    return data.jobs.filter(isValidJob);
  } catch (err) {
    // Log server-side only; never surface backend error details publicly.
    console.error("[sitemap] Failed to fetch sitemap jobs:", err?.message || err);
    return [];
  }
};

export default getSitemapJobs;
