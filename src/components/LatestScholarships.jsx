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
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 border"
              >
                {/* Image */}
                <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={s.universityImage}
                    className="w-full h-full object-cover hover:scale-105 transition"
                    alt=""
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-1 text-gray-800 line-clamp-2">
                  {s.scholarshipName}
                </h3>

                <div className="text-gray-500 text-sm mb-3">
                  {s.universityName}
                </div>

                {/* Info rows */}
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-primary" />
                    {s.degree || "—"}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {s.universityCity}, {s.universityCountry}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Deadline: {formatDate(s.applicationDeadline)}
                  </p>
                </div>

                {/* Button */}
                <a
                  href={`/scholarship/${s._id}`}
                  className="mt-4 inline-flex items-center justify-center w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestScholarships;
