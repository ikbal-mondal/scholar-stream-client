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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Scholarships</h2>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="px-4 py-2 flex items-center gap-2 bg-purple-600 text-white text-sm rounded-lg shadow-md"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* SIDEBAR AREA */}
        <div>
          {/* Overlay */}
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
          )}

          {/* SIDEBAR */}
          <aside
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-max w-72 lg:w-auto 
              bg-white lg:bg-secondary/10 shadow-xl lg:shadow-none 
              p-6 border lg:border-secondary rounded-none lg:rounded-xl 
              z-50 transform transition-transform duration-300
              ${
                mobileSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                <Filter size={20} /> Filters
              </h3>

              {/* close */}
              <button
                className="lg:hidden text-gray-600 text-xl"
                onClick={() => setMobileSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto max-h-[85vh] lg:max-h-max pr-1">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
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

              {/* Category */}
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

              {/* Compare */}
              {compareList.length > 0 && (
                <Link
                  to="/compare"
                  state={{ compareList }}
                  className="mt-4 block bg-purple-600 text-white text-center py-3 rounded-xl shadow hover:bg-purple-700 transition font-semibold"
                >
                  Compare ({compareList.length})
                </Link>
              )}
            </div>
          </aside>
        </div>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-6">
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-gray-800 hidden lg:block">
            All Scholarships
          </h2>

          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              {scholarships.map((s, index) => (
                <div
                  key={s._id}
                  ref={
                    index === scholarships.length - 1 ? lastElementRef : null
                  }
                  className="
    bg-white rounded-xl border shadow-lg p-4 
    flex flex-col md:flex-row 
    gap-4 md:gap-6 
    hover:shadow-xl transition relative overflow-hidden group
  "
                >
                  {/* Compare Btn */}
                  <button
                    onClick={() => toggleCompare(s)}
                    className="absolute top-3 right-3 bg-white shadow p-2 rounded-full hover:bg-purple-100 transition z-10"
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
                    className="
      w-full md:w-40 
      h-40 md:h-32 
      object-cover rounded-lg shadow-sm
    "
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition">
                      {s.scholarshipName}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base">
                      {s.universityName}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-700 text-sm">
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

                    <Link
                      to={`/scholarship/${s._id}`}
                      className="
        inline-block mt-4 px-5 py-2 
        bg-purple-600 text-white rounded-xl 
        hover:bg-purple-700 transition font-medium shadow
      "
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
    </div>
  );
};

export default AllScholarships;
