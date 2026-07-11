import { getJobUrl } from "@/utils/jobSlug";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://coimbatorejobs.in";
const SITE_NAME = "CoimbatoreJobs";

const absoluteUrl = (path) => {
  if (!path) return "";
  // Already absolute: keep the URL, but prefer HTTPS per Google's guidance.
  if (/^https?:\/\//i.test(path)) return path.replace(/^http:\/\//i, "https://");
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// Resolves the employer logo across data shapes: prefers the future backend
// field companyProfile.logo, falls back to the current job.logo. Returns ""
// when neither exists so callers omit the logo entirely (never a placeholder).
const getCompanyLogo = (job) => job?.companyProfile?.logo || job?.logo || "";

// Maps a freeform jobType label ("Full Time", "Part Time"...) to a
// Schema.org employmentType enum value. Returns null for unknown labels
// so callers can omit the field rather than emit an invalid value.
const EMPLOYMENT_TYPE_MAP = {
  "full time": "FULL_TIME",
  "full-time": "FULL_TIME",
  "part time": "PART_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  contractor: "CONTRACTOR",
  freelancer: "CONTRACTOR",
  freelance: "CONTRACTOR",
  temporary: "TEMPORARY",
  internship: "INTERN",
  intern: "INTERN",
  volunteer: "VOLUNTEER",
  "per diem": "PER_DIEM",
  other: "OTHER",
};

const mapEmploymentType = (jobType) => {
  if (!Array.isArray(jobType)) return null;
  const mapped = jobType
    .map((val) => EMPLOYMENT_TYPE_MAP[String(val?.type || "").toLowerCase().trim()])
    .filter(Boolean);
  if (!mapped.length) return null;
  // De-duplicate while preserving order.
  return [...new Set(mapped)];
};

// location fields are freeform ("City, Country" or just "City").
const buildJobLocation = (location) => {
  if (!location) return null;
  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return null;

  const address = {
    "@type": "PostalAddress",
    addressLocality: parts[0],
  };
  if (parts.length > 1) {
    // Last segment is treated as the country when more than one part exists.
    address.addressCountry = parts[parts.length - 1];
  }

  return {
    "@type": "Place",
    address,
  };
};

// Builds a Schema.org JobPosting object for a job. Shared by the canonical
// /jobs/[slug] route and the legacy /job-single/[id] route so their
// structured data never drifts apart. Only fields backed by real data are
// emitted - never invented - so the object stays valid as the backend grows.
// Future backend fields (description, datePosted, validThrough, structured
// salary, skills, qualifications...) plug in here without touching pages.
export const buildJobJsonLd = (job) => {
  if (!job) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.jobTitle || "Job Opportunity",
    url: absoluteUrl(getJobUrl(job)),
  };

  if (job.id !== undefined && job.id !== null) {
    jsonLd.identifier = {
      "@type": "PropertyValue",
      name: job.company || SITE_NAME,
      value: String(job.id),
    };
  }

  if (job.company) {
    const logo = getCompanyLogo(job);
    jsonLd.hiringOrganization = {
      "@type": "Organization",
      name: job.company,
      ...(job.link ? { sameAs: job.link } : {}),
      ...(logo ? { logo: absoluteUrl(logo) } : {}),
    };
  }

  const employmentType = mapEmploymentType(job.jobType);
  if (employmentType) {
    jsonLd.employmentType =
      employmentType.length === 1 ? employmentType[0] : employmentType;
  }

  const jobLocation = buildJobLocation(job.location);
  if (jobLocation) {
    jsonLd.jobLocation = jobLocation;
  }

  if (job.category) {
    jsonLd.industry = job.category;
  }

  // Fields below are only emitted once real backend data exists. They are
  // intentionally guarded so no placeholder/invalid values are produced.
  if (job.description) {
    jsonLd.description = job.description;
  }

  if (job.datePosted) {
    jsonLd.datePosted = job.datePosted;
  }

  if (job.validThrough) {
    jsonLd.validThrough = job.validThrough;
  }

  if (
    job.baseSalary &&
    typeof job.baseSalary === "object" &&
    job.baseSalary.currency
  ) {
    jsonLd.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.baseSalary.currency,
      value: {
        "@type": "QuantitativeValue",
        ...(job.baseSalary.value !== undefined
          ? { value: job.baseSalary.value }
          : {}),
        ...(job.baseSalary.minValue !== undefined
          ? { minValue: job.baseSalary.minValue }
          : {}),
        ...(job.baseSalary.maxValue !== undefined
          ? { maxValue: job.baseSalary.maxValue }
          : {}),
        ...(job.baseSalary.unitText
          ? { unitText: job.baseSalary.unitText }
          : {}),
      },
    };
  }

  if (typeof job.directApply === "boolean") {
    jsonLd.directApply = job.directApply;
  }

  return jsonLd;
};
