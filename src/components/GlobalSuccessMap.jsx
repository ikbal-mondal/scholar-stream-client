import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { motion } from "framer-motion";

// 🌍 World map URL
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// ⭐ Student success data
const successData = [
  {
    id: 1,
    student: "Aisha Rahman",
    home: "Bangladesh",
    homeCoords: [90.3563, 23.685],
    scholarshipCountry: "United Kingdom",
    scholarshipCoords: [-3.436, 55.3781],
    scholarship: "Gates Cambridge Scholarship",
    flag: "https://flagcdn.com/gb.svg",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    student: "Michael Chen",
    home: "China",
    homeCoords: [104.1954, 35.8617],
    scholarshipCountry: "Germany",
    scholarshipCoords: [10.4515, 51.1657],
    scholarship: "DAAD EPOS Scholarship",
    flag: "https://flagcdn.com/de.svg",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    student: "Sophia Martinez",
    home: "Spain",
    homeCoords: [-3.7492, 40.4637],
    scholarshipCountry: "USA",
    scholarshipCoords: [-95.7129, 37.0902],
    scholarship: "Fulbright Student Program",
    flag: "https://flagcdn.com/us.svg",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 4,
    student: "David Johnson",
    home: "USA",
    homeCoords: [-95.7129, 37.0902],
    scholarshipCountry: "Canada",
    scholarshipCoords: [-106.3468, 56.1304],
    scholarship: "University of Toronto Global Award",
    flag: "https://flagcdn.com/ca.svg",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 5,
    student: "Fatima Al-Zahra",
    home: "UAE",
    homeCoords: [54.3773, 23.4241],
    scholarshipCountry: "Australia",
    scholarshipCoords: [133.7751, -25.2744],
    scholarship: "Australia Awards Scholarship",
    flag: "https://flagcdn.com/au.svg",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
  },
  {
    id: 6,
    student: "Leonardo Costa",
    home: "Brazil",
    homeCoords: [-51.9253, -14.235],
    scholarshipCountry: "Japan",
    scholarshipCoords: [138.2529, 36.2048],
    scholarship: "MEXT Research Scholarship",
    flag: "https://flagcdn.com/jp.svg",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: 7,
    student: "Emma Wilson",
    home: "United Kingdom",
    homeCoords: [-3.436, 55.3781],
    scholarshipCountry: "New Zealand",
    scholarshipCoords: [174.886, -40.9006],
    scholarship: "New Zealand Manaaki Scholarship",
    flag: "https://flagcdn.com/nz.svg",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 8,
    student: "Haruto Mori",
    home: "Japan",
    homeCoords: [138.2529, 36.2048],
    scholarshipCountry: "South Korea",
    scholarshipCoords: [127.7669, 35.9078],
    scholarship: "Global Korea Scholarship",
    flag: "https://flagcdn.com/kr.svg",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: 9,
    student: "Maria Rossi",
    home: "Italy",
    homeCoords: [12.5674, 41.8719],
    scholarshipCountry: "Netherlands",
    scholarshipCoords: [5.2913, 52.1326],
    scholarship: "Amsterdam Excellence Scholarship",
    flag: "https://flagcdn.com/nl.svg",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    student: "Sami Haddad",
    home: "Saudi Arabia",
    homeCoords: [45.0792, 23.8859],
    scholarshipCountry: "France",
    scholarshipCoords: [2.2137, 46.2276],
    scholarship: "Sciences Po Emile-Boutmy Scholarship",
    flag: "https://flagcdn.com/fr.svg",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
  },
  {
    id: 11,
    student: "Anna Müller",
    home: "Germany",
    homeCoords: [10.4515, 51.1657],
    scholarshipCountry: "Sweden",
    scholarshipCoords: [18.6435, 60.1282],
    scholarship: "Swedish Institute Scholarship",
    flag: "https://flagcdn.com/se.svg",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 12,
    student: "Javier Hernández",
    home: "Mexico",
    homeCoords: [-102.5528, 23.6345],
    scholarshipCountry: "Spain",
    scholarshipCoords: [-3.7492, 40.4637],
    scholarship: "Spain Government MAEC-AECID Scholarship",
    flag: "https://flagcdn.com/es.svg",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 13,
    student: "Chen Wei",
    home: "Taiwan",
    homeCoords: [120.9605, 23.6978],
    scholarshipCountry: "Singapore",
    scholarshipCoords: [103.8198, 1.3521],
    scholarship: "NUS Research Excellence Award",
    flag: "https://flagcdn.com/sg.svg",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    id: 14,
    student: "Lara Oliveira",
    home: "Portugal",
    homeCoords: [-8.2245, 39.3999],
    scholarshipCountry: "Ireland",
    scholarshipCoords: [-8.2439, 53.4129],
    scholarship: "Government of Ireland Postgraduate Scholarship",
    flag: "https://flagcdn.com/ie.svg",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 15,
    student: "Noah Smith",
    home: "Canada",
    homeCoords: [-106.3468, 56.1304],
    scholarshipCountry: "Switzerland",
    scholarshipCoords: [8.2275, 46.8182],
    scholarship: "ETH Zurich Excellence Scholarship",
    flag: "https://flagcdn.com/ch.svg",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    id: 16,
    student: "Natalia Petrova",
    home: "Russia",
    homeCoords: [105.3188, 61.524],
    scholarshipCountry: "Czech Republic",
    scholarshipCoords: [15.4729, 49.8175],
    scholarship: "Prague Charles University Award",
    flag: "https://flagcdn.com/cz.svg",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 17,
    student: "Kim Soo-jin",
    home: "South Korea",
    homeCoords: [127.7669, 35.9078],
    scholarshipCountry: "Japan",
    scholarshipCoords: [138.2529, 36.2048],
    scholarship: "Tokyo University Global Masters Award",
    flag: "https://flagcdn.com/jp.svg",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: 18,
    student: "Ahmed Musa",
    home: "Nigeria",
    homeCoords: [8.6753, 9.082],
    scholarshipCountry: "USA",
    scholarshipCoords: [-95.7129, 37.0902],
    scholarship: "Yale Young Global Leaders Scholarship",
    flag: "https://flagcdn.com/us.svg",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    id: 19,
    student: "Sarah Ibrahim",
    home: "Egypt",
    homeCoords: [30.8025, 26.8206],
    scholarshipCountry: "Italy",
    scholarshipCoords: [12.5674, 41.8719],
    scholarship: "Bocconi Graduate Merit Award",
    flag: "https://flagcdn.com/it.svg",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 20,
    student: "Lucas Gray",
    home: "South Africa",
    homeCoords: [22.9375, -30.5595],
    scholarshipCountry: "United Kingdom",
    scholarshipCoords: [-3.436, 55.3781],
    scholarship: "Chevening Scholarship",
    flag: "https://flagcdn.com/gb.svg",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: 21,
    student: "Mina Solis",
    home: "Philippines",
    homeCoords: [121.774, 12.8797],
    scholarshipCountry: "Finland",
    scholarshipCoords: [25.7482, 61.9241],
    scholarship: "University of Helsinki Merit Award",
    flag: "https://flagcdn.com/fi.svg",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 22,
    student: "Arjun Mehta",
    home: "India",
    homeCoords: [78.9629, 20.5937],
    scholarshipCountry: "USA",
    scholarshipCoords: [-95.7129, 37.0902],
    scholarship: "Stanford Knight-Hennessy Scholarship",
    flag: "https://flagcdn.com/us.svg",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    id: 23,
    student: "Julia Weber",
    home: "Austria",
    homeCoords: [14.5501, 47.5162],
    scholarshipCountry: "Belgium",
    scholarshipCoords: [4.4699, 50.5039],
    scholarship: "KU Leuven Global Minds Scholarship",
    flag: "https://flagcdn.com/be.svg",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 24,
    student: "Yousef Khan",
    home: "Pakistan",
    homeCoords: [69.3451, 30.3753],
    scholarshipCountry: "Turkey",
    scholarshipCoords: [35.2433, 38.9637],
    scholarship: "Turkiye Burslari Scholarship",
    flag: "https://flagcdn.com/tr.svg",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    id: 25,
    student: "Anna Kováč",
    home: "Slovakia",
    homeCoords: [19.699, 48.669],
    scholarshipCountry: "Poland",
    scholarshipCoords: [19.1451, 51.9194],
    scholarship: "Poland NAWA Scholarship",
    flag: "https://flagcdn.com/pl.svg",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    id: 26,
    student: "Miguel Santos",
    home: "Brazil",
    homeCoords: [-51.9253, -14.235],
    scholarshipCountry: "Argentina",
    scholarshipCoords: [-63.6167, -38.4161],
    scholarship: "Buenos Aires International Award",
    flag: "https://flagcdn.com/ar.svg",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    id: 27,
    student: "Ella Johansson",
    home: "Sweden",
    homeCoords: [18.6435, 60.1282],
    scholarshipCountry: "Norway",
    scholarshipCoords: [8.4689, 60.472],
    scholarship: "Oslo International Excellence Award",
    flag: "https://flagcdn.com/no.svg",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    id: 28,
    student: "Daniel Moore",
    home: "Ireland",
    homeCoords: [-8.2439, 53.4129],
    scholarshipCountry: "Denmark",
    scholarshipCoords: [9.5018, 56.2639],
    scholarship: "Copenhagen Talent Scholarship",
    flag: "https://flagcdn.com/dk.svg",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
  },
  {
    id: 29,
    student: "Sara Haddad",
    home: "Morocco",
    homeCoords: [-7.0926, 31.7917],
    scholarshipCountry: "Portugal",
    scholarshipCoords: [-8.2245, 39.3999],
    scholarship: "Lisbon International Graduate Award",
    flag: "https://flagcdn.com/pt.svg",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    id: 30,
    student: "Jinwoo Park",
    home: "South Korea",
    homeCoords: [127.7669, 35.9078],
    scholarshipCountry: "Hong Kong",
    scholarshipCoords: [114.1095, 22.3964],
    scholarship: "HKU Presidential Scholarship",
    flag: "https://flagcdn.com/hk.svg",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
  },
];

const groupByCountry = (successData) => {
  const groups = {};

  successData.forEach((item) => {
    if (!groups[item.scholarshipCountry]) {
      groups[item.scholarshipCountry] = {
        flag: item.flag,
        coords: item.scholarshipCoords,
        students: [],
      };
    }
    groups[item.scholarshipCountry].students.push(item);
  });

  return groups;
};

const groupedData = groupByCountry(successData);

export default function GlobalSuccessMap() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* SECTION HEADER */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              How to Use the Global Success Map
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Explore how students from different parts of the world secured
              international scholarships through Scholar Stream. Each marker,
              connection, and card helps you visualize real global academic
              journeys.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* CARD 1 */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-purple-600 text-white rounded-xl text-2xl">
                  📍
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Home Country Markers
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Each pulsing purple dot on the map represents a student’s home
                country. It highlights where their academic journey began before
                receiving an international scholarship.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white rounded-xl text-2xl">
                  🎓
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Scholarship Destination Cards
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Flags show the scholarship destination country. Hovering reveals
                a modern info card containing student photos, names, and
                scholarship programs received. Destinations with multiple
                winners automatically group students together.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-pink-600 text-white rounded-xl text-2xl">
                  🛫
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Animated Journey Lines
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Curved purple lines visually connect a student’s home country to
                the country where they received a scholarship. The animation
                highlights real global student migrations.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-teal-600 text-white rounded-xl text-2xl">
                  👤
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Student Profile Preview
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Hovering over a scholarship country reveals detailed student
                profiles — their photo, name, and scholarship title. For
                countries with many students, a “+ More Students” indicator is
                automatically displayed.
              </p>
            </div>

            {/* CARD 5 */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-yellow-500 text-white rounded-xl text-2xl">
                  🌍
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Global Insights
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The map gives a powerful overview of where scholarships are most
                commonly awarded, which regions participate the most, and how
                globally connected Scholar Stream students truly are.
              </p>
            </div>

            {/* CARD 6 */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-xl text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Smooth Professional Experience
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Designed with clean UI, animations, and tooltip interactivity —
                the map ensures a seamless and modern experience on both desktop
                and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* MAP */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl p-6">
            <ComposableMap projectionConfig={{ scale: 160 }}>
              {/* WORLD MAP */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="fill-gray-300 stroke-gray-500 hover:fill-purple-300 transition"
                    />
                  ))
                }
              </Geographies>

              {/* LINES + GROUPED SCHOLARSHIP MARKERS */}
              {Object.keys(groupedData).map((country, index) => {
                const group = groupedData[country];
                const firstStudent = group.students[0];

                return (
                  <g key={country}>
                    {/* Render ALL lines for all students of this country */}
                    {group.students.map((stu) => (
                      <Line
                        key={stu.id}
                        from={stu.homeCoords}
                        to={group.coords}
                        stroke="#A78BFA"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeDasharray="5 6"
                        opacity={0.6}
                      />
                    ))}

                    {/* HOME DOTS */}
                    {group.students.map((stu) => (
                      <Marker
                        key={stu.id + "-home"}
                        coordinates={stu.homeCoords}
                      >
                        <motion.circle
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          r={5}
                          className="fill-purple-600"
                        />
                      </Marker>
                    ))}

                    {/* SCHOLARSHIP COUNTRY MARKER (GROUPED CARD) */}
                    <Marker coordinates={group.coords}>
                      <foreignObject x={-60} y={-60} width={180} height={120}>
                        <div
                          data-tooltip-id="country-tooltip"
                          data-tooltip-html={`
                            <div style='padding:10px; width:200px'>
                              <div style='display:flex; align-items:center; gap:10px;'>
                                <img src="${
                                  group.flag
                                }" style="width:28px; height:18px; border-radius:4px;" />
                                <strong>${country}</strong>
                              </div>

                              <div style='margin-top:8px; font-size:14px; color:#e5e7eb'>
                                ${group.students.length} Students Awarded
                              </div>

                              <hr style='margin-top:10px; opacity:0.3;' />

                              ${group.students
                                .map(
                                  (s) => `
                                <div style='display:flex; align-items:center; gap:8px; margin-top:8px;'>
                                  <img src="${s.avatar}" style="width:28px; height:28px; border-radius:50%" />
                                  <div>
                                    <div style='font-weight:600;'>${s.student}</div>
                                    <div style='font-size:12px; opacity:0.7;'>${s.scholarship}</div>
                                  </div>
                                </div>`
                                )
                                .slice(0, 4)
                                .join("")}

                              ${
                                group.students.length > 4
                                  ? `<div style='margin-top:6px; font-size:12px; opacity:0.6;'>+ ${
                                      group.students.length - 4
                                    } more</div>`
                                  : ""
                              }
                            </div>
                          `}
                          className="bg-white rounded-2xl shadow-lg px-3 py-3 border border-gray-200 w-fit hover:scale-105 hover:shadow-2xl transition cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={group.flag}
                              className="w-8 h-5 rounded-md shadow-sm"
                            />
                            <span className="font-semibold text-gray-700">
                              {country}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {group.students.length} Students
                          </p>
                        </div>
                      </foreignObject>
                    </Marker>
                  </g>
                );
              })}
            </ComposableMap>
          </div>
        </div>

        {/* TOOLTIP */}
        <ReactTooltip
          id="country-tooltip"
          place="right"
          className="rounded-xl shadow-xl bg-gray-900 text-white text-sm p-3 max-w-xs backdrop-blur-md"
        />
      </div>
    </section>
  );
}
