"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import jobFeatured from "../../data/job-featured";
import "@/public/scss/components/job-slider.scss";

const JobFeaturedSlider = () => {
  const slides = jobFeatured.slice(20, 28);
  const [page, setPage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const trackRef = useRef(null);

  // determine visible count based on viewport
  useEffect(() => {
    const getVisible = () => (window.innerWidth >= 768 ? 3 : 1);
    const apply = () => setVisibleCount(getVisible());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const maxPage = Math.max(0, slides.length - visibleCount);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, 4000);
    return () => clearInterval(t);
  }, [autoplay, slides.length, visibleCount, maxPage]);

  useEffect(() => {
    if (!trackRef.current) return;
    const slideWidthPercent = 100 / visibleCount;
    trackRef.current.style.transform = `translateX(-${page * slideWidthPercent}%)`;
  }, [page, visibleCount]);

  const prev = () => {
    setAutoplay(false);
    setPage((p) => (p === 0 ? maxPage : p - 1));
  };

  const next = () => {
    setAutoplay(false);
    setPage((p) => (p >= maxPage ? 0 : p + 1));
  };

  return (
    <div
      className="job-slider-wrapper"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="job-slider-viewport">
        <div className="job-slider-track" ref={trackRef}>
          {slides.map((item) => (
            <div className="job-slide" key={item.id} style={{ flex: `0 0 ${100/visibleCount}%` }}>
              <div className="job-block-four slider-style">
                <div className="inner-box">
                  <ul className="job-other-info">
                    {item.jobType.map((val, i) => (
                      <li key={i} className={`${val.styleClass}`}>
                        {val.type}
                      </li>
                    ))}
                  </ul>
                  <span className="company-logo">
                    <Image
                      width={90}
                      height={90}
                      src={item.logo}
                      alt="featured job"
                    />
                  </span>
                  <span className="company-name">Catalyst</span>
                  <h4>
                    <Link href={`/job-single/${item.id}`}>{item.jobTitle}</Link>
                  </h4>
                  <div className="location">
                    <span className="icon flaticon-map-locator"></span>
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="job-slider-controls">
        <button aria-label="Prev" className="slider-btn prev" onClick={prev}>
          &#10094;
        </button>
        <button aria-label="Next" className="slider-btn next" onClick={next}>
          &#10095;
        </button>
      </div>

      <div className="job-slider-indicators">
        {Array.from({ length: maxPage + 1 }).map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === page ? "active" : ""}`}
            onClick={() => {
              setAutoplay(false);
              setPage(i);
            }}
            aria-label={`Go to slide group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default JobFeaturedSlider;