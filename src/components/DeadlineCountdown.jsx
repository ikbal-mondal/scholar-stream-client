import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const scholarshipData = [
  {
    id: 1,
    title: "Gates Cambridge Scholarship",
    country: "United Kingdom",
    deadline: "2026-03-01T23:59:59",
  },
  {
    id: 2,
    title: "Erasmus Mundus Joint Masters",
    country: "EU Countries",
    deadline: "2026-02-10T23:59:59",
  },
  {
    id: 3,
    title: "DAAD EPOS Scholarship",
    country: "Germany",
    deadline: "2026-02-21T23:59:59",
  },
  {
    id: 4,
    title: "Fulbright Foreign Student Program",
    country: "USA",
    deadline: "2026-03-15T23:59:59",
  },
];

export default function DeadlineCountdown() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();

      const filtered = scholarshipData
        .map((item) => {
          const diff = new Date(item.deadline).getTime() - now;
          if (diff <= 0) return null;

          return {
            ...item,
            time: {
              d: Math.floor(diff / (1000 * 60 * 60 * 24)),
              h: Math.floor((diff / (1000 * 60 * 60)) % 24),
              m: Math.floor((diff / (1000 * 60)) % 60),
              s: Math.floor((diff / 1000) % 60),
            },
            diff,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.diff - b.diff)
        .slice(0, 3);

      setUpcoming(filtered);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Upcoming Deadlines
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Apply before the time runs out — these scholarships close soon.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-6 flex flex-col justify-between"
            >
              {/* Title */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-purple-700 font-medium mt-1">
                  {item.country}
                </p>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-3 my-6">
                {["d", "h", "m", "s"].map((key, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-purple-100 text-purple-700 rounded-xl p-3"
                  >
                    <p className="text-2xl md:text-3xl font-bold">
                      {item.time[key]}
                    </p>
                    <span className="text-xs mt-1">
                      {key === "d"
                        ? "Days"
                        : key === "h"
                        ? "Hours"
                        : key === "m"
                        ? "Min"
                        : "Sec"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className="w-full py-3 flex justify-center items-center gap-2 bg-purple-600 
                text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
