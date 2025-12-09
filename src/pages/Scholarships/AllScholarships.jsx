import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  GraduationCap,
  Calendar,
  Filter,
  RefreshCcw,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import api from "../../services/api";

const LIMIT = 8;

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [compareList, setCompareList] = useState([]);

  const observer = useRef();

  // Fetch scholarships
  const loadScholarships = async (reset = false) => {
    try {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      const res = await api.get("/scholarships", {
        params: {
          q: search || undefined,
          country: country || undefined,
          degree: degree || undefined,
          category: category || undefined,
          subjectCategory: subject || undefined,
          page,
          limit: LIMIT,
        },
      });

      const fetched = res.data.results || [];

      reset
        ? setScholarships(fetched)
        : setScholarships((prev) => [...prev, ...fetched]);

      setHasMore(fetched.length === LIMIT);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadScholarships(true);
  }, [search, country, degree, category, subject]);

  // Infinite scroll
  const lastElementRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  useEffect(() => {
    if (page > 1) loadScholarships();
  }, [page]);

  const resetFilters = () => {
    setSearch("");
    setCountry("");
    setDegree("");
    setCategory("");
    setSubject("");
  };

  const toggleCompare = (item) => {
    setCompareList((prev) =>
      prev.some((x) => x._id === item._id)
        ? prev.filter((x) => x._id !== item._id)
        : [...prev, item]
    );
  };

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow animate-pulse p-5 flex gap-5 border">
      <div className="w-44 h-32 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* ------------------------------------
          FILTER SIDEBAR
      ------------------------------------- */}
      <aside className="lg:col-span-1 h-max sticky top-24 bg-secondary/10 backdrop-blur-xl shadow-xl rounded-xl p-6 border border-secondary">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-primary">
          <Filter size={20} className="text-primary" /> Filters
        </h3>

        <div className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scholarships..."
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Country */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-xl py-2 px-3 focus:ring-2 focus:ring-purple-400 outline-none"
          >
            <option value="">Country</option>
            <option>USA</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>Australia</option>
            <option>Turkey</option>
          </select>

          {/* Degree */}
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full border rounded-xl py-2 px-3 focus:ring-2 focus:ring-purple-400 outline-none"
          >
            <option value="">Degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
            <option>PhD</option>
          </select>

          {/* Funding Type */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl py-2 px-3 focus:ring-2 focus:ring-purple-400 outline-none"
          >
            <option value="">Funding Type</option>
            <option>Full Fund</option>
            <option>Partial</option>
            <option>Self Fund</option>
          </select>

          {/* Subject */}
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (e.g. IT)"
            className="w-full border rounded-xl py-2 px-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 w-full py-2 border rounded-xl hover:bg-gray-100 transition"
          >
            <RefreshCcw size={16} /> Reset Filters
          </button>
        </div>

        {/* Compare Button */}
        {compareList.length > 0 && (
          <Link
            to="/compare"
            state={{ compareList }}
            className="mt-6 block bg-purple-600 text-white text-center py-3 rounded-xl shadow hover:bg-purple-700 transition font-semibold"
          >
            Compare ({compareList.length})
          </Link>
        )}
      </aside>

      {/* ------------------------------------
          MAIN SCHOLARSHIP GRID
      ------------------------------------- */}
      <main className="lg:col-span-3 space-y-6">
        <h2 className="text-3xl font-bold mb-4 tracking-tight text-gray-800">
          🎓 All Scholarships
        </h2>

        {loading ? (
          [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {scholarships.map((s, index) => (
              <div
                key={s._id}
                ref={index === scholarships.length - 1 ? lastElementRef : null}
                className="bg-white rounded-xl border shadow-lg p-5 flex gap-6 border-primary hover:shadow-xl transition relative overflow-hidden group"
              >
                {/* Compare Button */}
                <button
                  onClick={() => toggleCompare(s)}
                  className="absolute top-4 right-4 bg-white shadow p-2 rounded-full hover:bg-purple-100 transition"
                >
                  {compareList.some((x) => x._id === s._id) ? (
                    <CheckCircle2 className="text-purple-600" size={22} />
                  ) : (
                    <PlusCircle className="text-purple-500" size={22} />
                  )}
                </button>

                {/* University Image */}
                <img
                  src={s.universityImage}
                  className="w-40 h-32 object-cover rounded-lg shadow-sm"
                />

                {/* Scholarship Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition">
                    {s.scholarshipName}
                  </h3>

                  <p className="text-gray-600">{s.universityName}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-700 text-sm">
                    <span className="flex items-center gap-1">
                      <GraduationCap size={16} /> {s.degree}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={16} /> {s.universityCity},{" "}
                      {s.universityCountry}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={16} />{" "}
                      {new Date(s.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>

                  {/* View details */}
                  <Link
                    to={`/scholarship/${s._id}`}
                    className="inline-block mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {loadingMore && <SkeletonCard />}
          </>
        )}
      </main>
    </div>
  );
};

export default AllScholarships;
