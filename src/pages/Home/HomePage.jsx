import React from "react";
import HeroBanner from "../../components/HeroBanner";
import LatestScholarships from "../../components/LatestScholarships";
import CategoryGrid from "../../components/CategoryGrid";
import FilterCarousel from "../../components/FilterCarousel";
import HowItWorks from "../../components/HowItWorks";
import FAQSection from "../../components/FAQSection";
import CTABanner from "../../components/CTABanner";
import DeadlineCountdown from "../../components/DeadlineCountdown";
import VideoReviews from "../../components/VideoReviews";
import GlobalSuccessMap from "../../components/GlobalSuccessMap";

const HomePage = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <LatestScholarships></LatestScholarships>
      <CategoryGrid></CategoryGrid>
      <HowItWorks></HowItWorks>
      <DeadlineCountdown></DeadlineCountdown>
      <FilterCarousel></FilterCarousel>
      <FAQSection></FAQSection>
      <CTABanner></CTABanner>
      <VideoReviews></VideoReviews>
      <GlobalSuccessMap></GlobalSuccessMap>
    </div>
  );
};

export default HomePage;
