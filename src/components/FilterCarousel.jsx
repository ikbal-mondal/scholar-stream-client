import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Stamp,
  BookKey,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// FAKE JSON DATA
const filterTags = [
  {
    id: 1,
    label: "Fully Funded",
    icon: <BadgeCheck className="w-6 h-6" />,
  },
  {
    id: 2,
    label: "No IELTS Required",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 3,
    label: "High Acceptance Rate",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 4,
    label: "No Application Fee",
    icon: <Stamp className="w-6 h-6" />,
  },
  {
    id: 5,
    label: "Government Scholarships",
    icon: <BookKey className="w-6 h-6" />,
  },
  {
    id: 6,
    label: "STEM Programs",
    icon: <BadgeCheck className="w-6 h-6" />,
  },
  {
    id: 7,
    label: "International Students",
    icon: <Sparkles className="w-6 h-6" />,
  },
];

export default function FilterCarousel({ onFilterSelect }) {
  const sliderRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(null);

  // Smooth infinite auto-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;

    const autoScroll = setInterval(() => {
      scrollAmount += 1.5;
      slider.scrollLeft = scrollAmount;

      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(autoScroll);
  }, []);

  // Manual arrow scroll
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  const handleSelect = (tag) => {
    setActiveFilter(tag.id);
    onFilterSelect && onFilterSelect(tag.label);
  };

  return (
    <section className="py-14 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Advanced Scholarship Filters
          </h2>

          {/* Arrow Buttons */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-white shadow hover:bg-purple-300 hover:text-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-white shadow hover:bg-purple-300 hover:text-white transition"
            >
              <ChevronRight className="w-5 h-5  " />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        >
          {filterTags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => handleSelect(tag)}
              className={`
                flex items-center gap-3 cursor-pointer 
                px-6 py-3 min-w-max rounded-2xl border 
                backdrop-blur-lg bg-white/70 shadow-md
                transition-all duration-300 
                hover:shadow-xl hover:bg-purple-600 hover:text-white
                ${
                  activeFilter === tag.id
                    ? "bg-purple-600 text-white border-purple-600 shadow-xl"
                    : "border-gray-200 text-gray-700"
                }
              `}
            >
              <span className="text-purple-600 group-hover:text-white transition">
                {tag.icon}
              </span>

              <span className="font-semibold whitespace-nowrap text-sm">
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
