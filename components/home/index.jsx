import Link from "next/link";
import Block from "../block/Block";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import LoginPopup from "../common/form/login/LoginPopup";
import Partner2 from "../common/partner/Partner2";
import MobileMenu from "../header/MobileMenu";
import Hero8 from "../hero/hero-8";
import JobFeaturedSlider from "../job-featured/JobFeaturedSlider";
import TopCompany3 from "../top-company/TopCompany3";
import Footer from "./Footer";
import Header from "./Header";

const index = () => {
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero8 />
      {/* End Hero Section */}

      <section className="clients-section-two alternate">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Top Companies Hiring at Coimbatore Jobs Now</h2>
            <div className="text">
              Discover leading employers in Coimbatore actively hiring top talent
            </div>
          </div>
          {/* End .sec-title */}

          <div className="clients-section-two alternate layout-pt-60 layout-pb-60">
            <div className="auto-container">
              <div className="sponsors-outer wow fadeInUp">
                <div className="sponsors-carousel">
                  <Partner2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

      <Block />
      {/* <!-- End Recruiter Section --> */}

      <section className="job-section-four alternate">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Job Openings</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>
          {/* End .sec-title */}

          <div className="row" data-aos="fade-up">
            <JobFeaturedSlider />
          </div>
          {/* End .row */}

          <div className="btn-box">
            <Link href="/job-list" className="theme-btn btn-style-one">
              Load More Listing
            </Link>
          </div>
        </div>
      </section>
      {/* <!-- End Job Section --> */}

      <section className="pricing-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Pricing Packages</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor.
            </div>
          </div>
          {/* End title */}
          <Pricing />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>
      {/* <!-- End Pricing Section --> */}

      <section className="top-companies">
        <div className="auto-container">
          <div className="sec-title-outer">
            <div className="sec-title">
              <h2>Top Company Registered</h2>
              <div className="text">
                Some of the companies we have helped recruit excellent
                applicants over the years.
              </div>
            </div>
            <a href="#" className="link">
              Browse All <span className="fa fa-angle-right"></span>
            </a>
          </div>
          {/* End .sec-title-outer */}

          <div className="carousel-outer" data-aos="fade-up">
            <div className="row">
              <TopCompany3 />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Top Companies --> */}

      <section className="news-section style-two">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Recent News Articles</h2>
            <div className="text">
              Fresh job related news content posted each day.
            </div>
          </div>
          {/* End ."sec-title */}
          <div className="row" data-aos="fade-up">
            <Blog />
          </div>
        </div>
      </section>
      {/* <!-- End News Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;


