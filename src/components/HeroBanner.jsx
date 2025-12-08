import { FaGraduationCap, FaChalkboardTeacher, FaClock } from "react-icons/fa";
import CustomDropdown from "../components/CustomDropdown";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router";

const HeroBanner = () => {
  const { backendUser, logout } = useContext(AuthContext) || {};
  const role = backendUser?.role || null;
  return (
    <div className="relative w-full bg-[#faf8ff] pb-32 md:pb-40">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
            Start Your Global Education Journey with
            <span className="text-secondary"> Scholar Stream</span>
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            Explore top scholarships from worldwide universities. Apply easily
            and boost your academic future.
          </p>
          <Link
            to="/all-scholarships"
            className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-purple-700 transition shadow-md"
          >
            Explore Scholarships
          </Link>
          {backendUser && (
            <div className="hidden lg:block">
              <div
                className="flex  mt-6 items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 
                  border border-purple-200 rounded-xl px-4 py-2 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-bold">
                  {backendUser?.name?.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Welcome back, {backendUser?.name}
                  </p>
                  <p className="text-xs text-purple-700 font-medium">
                    Role: {backendUser?.role || "User"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
            alt="Scholar student"
            className="rounded-xl shadow-xl w-full max-w-md md:max-w-lg object-cover"
          />
        </div>
      </div>

      {/* FLOATING SEARCH CARD */}
      <div className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
          {/* SEARCH + FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* SEARCH BOX */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search Scholarships..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>

            {/* CUSTOM FILTER DROPDOWNS */}
            <CustomDropdown
              label="Country"
              options={["USA", "UK", "Canada", "Germany", "Australia"]}
            />

            <CustomDropdown
              label="Degree"
              options={["Diploma", "Bachelor", "Masters", "PhD"]}
            />

            <CustomDropdown
              label="Fund Category"
              options={["Full Fund", "Partial Fund", "Self Fund"]}
            />
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-primary/20 hover:shadow-md transition">
              <FaGraduationCap className="text-3xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-primary">
                  5,000+ Scholarships
                </h3>
                <p className="text-gray-600 text-sm">
                  Find opportunities from top universities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-primary/20 hover:shadow-md transition">
              <FaChalkboardTeacher className="text-3xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-primary">
                  Expert Guidance
                </h3>
                <p className="text-gray-600 text-sm">
                  Apply with professional support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-primary/20 hover:shadow-md transition">
              <FaClock className="text-3xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-primary">
                  Fast Processing
                </h3>
                <p className="text-gray-600 text-sm">Get updates instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
