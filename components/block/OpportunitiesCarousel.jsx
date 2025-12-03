"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@/public/scss/components/carousel.scss";

const OpportunitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [autoplay, setAutoplay] = useState(true);

  const opportunities = [
    {
      id: 1,
      title: "Senior Developer",
      company: "Tech Corp",
      description: "Build scalable applications with modern tech stack",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovate Inc",
      description: "Lead product strategy and drive user engagement",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      description: "Create beautiful and intuitive user experiences",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Analytics Hub",
      description: "Transform data into actionable insights",
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "Growth Agency",
      description: "Drive brand growth and market expansion",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % opportunities.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoplay, opportunities.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) =>
      prev === 0 ? opportunities.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % opportunities.length);
  };

  const getCardPosition = (index) => {
    const diff = (index - currentIndex + opportunities.length) % opportunities.length;
    // Left cards (closer together)
    if (diff === 3) return { scale: 0.72, zIndex: 1, offset: -100 };
    if (diff === 4) return { scale: 0.85, zIndex: 2, offset: -50 };
    // Center card (current - large)
    if (diff === 0) return { scale: 1, zIndex: 3, offset: 0 };
    // Right cards (closer together)
    if (diff === 1) return { scale: 0.85, zIndex: 2, offset: 50 };
    if (diff === 2) return { scale: 0.72, zIndex: 1, offset: 100 };
    return { scale: 0, zIndex: -1, offset: 0 };
  };

  return (
    <div className="carousel-container">
      {opportunities.map((opp, index) => {
        const position = getCardPosition(index);
        return (
          <div
            key={opp.id}
            className="carousel-card"
            style={{
              transform: `translateX(${position.offset}px) scale(${position.scale})`,
              zIndex: position.zIndex,
            }}
          >
            <div className="card-content">
              <h3 className="card-title">{opp.title}</h3>
              <p className="card-company">{opp.company}</p>
              <p className="card-description">{opp.description}</p>
              <Link href="/job-list" className="card-link">
                Explore Job
              </Link>
            </div>
          </div>
        );
      })}

      <div className="carousel-nav">
        <button
          className="carousel-btn prev-btn"
          onClick={handlePrev}
          aria-label="Previous card"
        >
          &#10094;
        </button>
        <button
          className="carousel-btn next-btn"
          onClick={handleNext}
          aria-label="Next card"
        >
          &#10095;
        </button>
      </div>

      <div className="carousel-indicators">
        {opportunities.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setAutoplay(false);
              setCurrentIndex(index);
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesCarousel;
