import React from "react";

import Home from "@/components/home";

export const metadata = {
  title: "Home || Coimbatore Jobs - Coimbatore's No.1 Job Portal",
  description: "Coimbatore Jobs is a leading job portal in Coimbatore, connecting job seekers with top employers in the region.",
  opensGraph: {
    title: "Home || Coimbatore Jobs - Coimbatore's No.1 Job Portal",
    description: "Coimbatore Jobs is a leading job portal in Coimbatore, connecting job seekers with top employers in the region.",
    url: "https://coimbatorejobs.in",
    siteName: "Coimbatore Jobs",
    images: [
      {
        url: "https://coimbatorejobs.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coimbatore Jobs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const index = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default index;
