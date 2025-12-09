import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";

const LatestScholarships = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLatest = async () => {
    try {
      const res = await api.get("/scholarships-latest");
      setItems(res.data);
    } catch (err) {
      console.error("Latest fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLatest();
  }, []);

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return dt.toLocaleDateString();
  };

  return (
    <section className="py-16 mt-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            🎓 Latest Scholarships
          </h2>

          <a
            href="/all-scholarships"
            className="text-primary flex items-center gap-1 font-semibold hover:underline"
          >
            View All <ArrowRight size={18} />
          </a>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <div
                key={s._id}
                className="
    group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
  "
              >
                {/* Image */}
                <div className="relative w-full h-54 overflow-hidden">
                  <img
                    src={s.universityImage}
                    alt=""
                    className="
        w-full h-full object-cover 
        group-hover:scale-110 transition duration-500
      "
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="
        absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent
        opacity-0 group-hover:opacity-100 transition duration-300
      "
                  ></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3
                    className="
        text-lg font-bold mb-1 text-gray-900 line-clamp-2 
        group-hover:text-purple-600 transition
      "
                  >
                    {s.scholarshipName}
                  </h3>

                  <p className="text-gray-500 text-sm mb-3">
                    {s.universityName}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-700">
                      <GraduationCap size={16} className="text-purple-600" />
                      {s.degree || "—"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-purple-600" />
                      {s.universityCity}, {s.universityCountry}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-purple-600" />
                      Deadline: {formatDate(s.applicationDeadline)}
                    </p>
                  </div>

                  {/* Button */}
                  <a
                    href={`/scholarship/${s._id}`}
                    className="
        mt-5 block text-center w-full py-2.5 rounded-xl font-semibold
        bg-gradient-to-r from-purple-600 to-primary
        text-white shadow-md hover:shadow-lg 
        hover:opacity-90 transition-all duration-300
      "
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestScholarships;
