import JobList from "@/components/job-listing-pages/job-list";

export function generateMetadata({ searchParams }) {
  const page = searchParams?.page ?? "1";

  return {
    title: `Job List - Page ${page} || Coimbatore Jobs - Job Board React NextJS Template`,
    description: `Coimbatore Jobs - Job Board React NextJS Template - Page ${page}`,
  };
}

const index = () => {
  return (
    <>
      <JobList />
    </>
  );
};

export default index;
