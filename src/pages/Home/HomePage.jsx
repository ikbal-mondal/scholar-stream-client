import React from "react";
import HeroBanner from "../../components/HeroBanner";
import LatestScholarships from "../../components/LatestScholarships";
import CategoryGrid from "../../components/CategoryGrid";
import FilterCarousel from "../../components/FilterCarousel";
import HowItWorks from "../../components/HowItWorks";
import FAQSection from "../../components/FAQSection";

const HomePage = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <LatestScholarships></LatestScholarships>
      <CategoryGrid></CategoryGrid>
      <HowItWorks></HowItWorks>
      <FilterCarousel></FilterCarousel>
      <FAQSection></FAQSection>
    </div>
  );
};

export default HomePage;
