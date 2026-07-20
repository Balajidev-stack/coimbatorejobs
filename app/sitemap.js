import { getSitemapJobs } from "@/services/jobs";
import { getJobUrl } from "@/utils/jobSlug";

// Native Next.js App Router sitemap (MetadataRoute.Sitemap). Served at
// /sitemap.xml. Regenerated on the server every hour so it reflects the
// backend's current set of eligible jobs without any manual XML editing.
export const revalidate = 3600;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://coimbatorejobs.in"
).replace(/\/$/, "");

// Curated public, indexable pages only. Dashboards, auth, shop, invoice,
// legacy /job-single/<id> and API routes are intentionally excluded.
const STATIC_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/job-list", priority: 0.9, changeFrequency: "daily" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
];

// Returns a valid Date from updatedAt || createdAt, or null (so we can omit
// lastModified rather than invent a timestamp).
const toLastModified = (job) => {
  const raw = job?.updatedAt || job?.createdAt;
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
};

export default async function sitemap() {
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const jobs = await getSitemapJobs();

  const seen = new Set();
  const jobEntries = [];

  for (const job of jobs) {
    // Backend slug is authoritative; getJobUrl returns /jobs/<slug>.
    const url = `${SITE_URL}${getJobUrl(job)}`;
    if (seen.has(url)) continue; // guard against duplicate slugs
    seen.add(url);

    const entry = {
      url,
      changeFrequency: "weekly",
      priority: 0.7,
    };

    const lastModified = toLastModified(job);
    if (lastModified) entry.lastModified = lastModified;

    jobEntries.push(entry);
  }

  return [...staticEntries, ...jobEntries];
}
