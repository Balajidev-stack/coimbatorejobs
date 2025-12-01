import Link from "next/link";
import OpportunitiesCarousel from "./OpportunitiesCarousel";

const Block = () => {
  return (
    <section className="recruiter-section">
      <div className="outer-box">
        <div className="image-column">
          <OpportunitiesCarousel />
        </div>
        {/* End image-column */}

        <div className="content-column">
          <div className="inner-column" data-aos="fade-up">
            <div className="sec-title">
              <h2>Are You a Recruiter?</h2>
              <div className="text">
                Post job openings and find top talent from Coimbatore. Access a pool of qualified candidates actively seeking opportunities in various industries.
              </div>
              <Link href="/login" className="theme-btn btn-style-one">
                Post New Job
              </Link>
            </div>
          </div>
        </div>
        {/* End .content-column */}
      </div>
    </section>
  );
};

export default Block;
