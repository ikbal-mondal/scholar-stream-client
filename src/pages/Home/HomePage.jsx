import React from "react";
import HeroBanner from "../../components/HeroBanner";
import LatestScholarships from "../../components/LatestScholarships";
import CategoryGrid from "../../components/CategoryGrid";
import FilterCarousel from "../../components/FilterCarousel";

const HomePage = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <LatestScholarships></LatestScholarships>
      <CategoryGrid></CategoryGrid>
      <FilterCarousel></FilterCarousel>
    </div>
  );
};

export default HomePage;
