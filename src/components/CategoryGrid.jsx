import { GraduationCap, Book, Globe2, Trophy, School } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Masters Scholarships",
    icon: <GraduationCap className="w-10 h-10 text-white" />,
    color: "bg-purple-600",
  },
  {
    id: 2,
    title: "PhD Scholarships",
    icon: <Book className="w-10 h-10 text-white" />,
    color: "bg-purple-700",
  },
  {
    id: 3,
    title: "Diploma Programs",
    icon: <School className="w-10 h-10 text-white" />,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Fully-Funded",
    icon: <Trophy className="w-10 h-10 text-white" />,
    color: "bg-indigo-600",
  },
  {
    id: 5,
    title: "Country-wise Scholarships",
    icon: <Globe2 className="w-10 h-10 text-white" />,
    color: "bg-indigo-700",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore Scholarships by Category
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 border"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg ${cat.color}`}
              >
                {cat.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition">
                {cat.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View all scholarships under this category.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
