import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";

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
        .filter(Boolean) // remove expired
        .sort((a, b) => a.diff - b.diff) // soonest deadline first
        .slice(0, 3); // show only 3

      setUpcoming(filtered);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Upcoming Deadlines
          </h2>
          <p className="text-gray-600 mt-2">
            Apply before the time runs out — here are the next scholarships
            closing soon.
          </p>
        </div>

        <div className="space-y-6">
          {upcoming.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6 rounded-2xl border shadow-sm 
                         hover:shadow-xl transition bg-gray-50"
            >
              {/* Left Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.country}</p>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-purple-700">
                    {item.time.d}
                  </p>
                  <span className="text-sm text-gray-600">Days</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-700">
                    {item.time.h}
                  </p>
                  <span className="text-sm text-gray-600">Hours</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-700">
                    {item.time.m}
                  </p>
                  <span className="text-sm text-gray-600">Minutes</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-700">
                    {item.time.s}
                  </p>
                  <span className="text-sm text-gray-600">Seconds</span>
                </div>
              </div>

              {/* Apply Button */}
              <button
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold 
                                hover:bg-purple-700 transition flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
