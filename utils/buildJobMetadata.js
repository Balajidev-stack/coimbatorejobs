import { getJobUrl } from "@/utils/jobSlug";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://coimbatorejobs.in";
const SITE_NAME = "CoimbatoreJobs";
const DEFAULT_IMAGE = "/images/logo.svg";

// location fields are freeform ("City, Country" or just "City") - take the city part
const getCity = (location) => {
  if (!location) return "";
  return location.split(",")[0].trim();
};

const absoluteUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// Builds Next.js Metadata for a job detail page. Shared by both the
// canonical /jobs/[slug] route and the legacy /job-single/[id] route so
// their title/description/OG/Twitter output never drifts apart.
export const buildJobMetadata = (job) => {
  if (!job) {
    return {
      title: `Job Opportunity | ${SITE_NAME}`,
      description: `Find jobs in Coimbatore on ${SITE_NAME}.`,
      robots: { index: false, follow: true },
    };
  }

  const jobTitle = job.jobTitle || "Job Opportunity";
  const company = job.company || "";
  const city = getCity(job.location) || "Coimbatore";
  const employmentType = job.jobType?.[0]?.type || "";
  const salary = job.salary || "";
  const experience = job.experience || "";

  const title = [`${jobTitle} Jobs in ${city}`, company, SITE_NAME]
    .filter(Boolean)
    .join(" | ");

  const description = [
    company
      ? `Apply for ${jobTitle} Jobs at ${company} in ${city}.`
      : `Apply for ${jobTitle} Jobs in ${city}.`,
    salary ? `Salary ${salary}.` : "",
    employmentType ? `${employmentType}.` : "",
    experience ? `Experience: ${experience}.` : "",
    `Apply online through ${SITE_NAME}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const image = absoluteUrl(job.logo || DEFAULT_IMAGE);
  const url = absoluteUrl(getJobUrl(job));

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};
