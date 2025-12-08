export default function AboutUsPage() {
  return (
    <section className="bg-gray-50">
      {/* HERO SECTION */}
      <div className="relative py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">About Scholar Stream</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto opacity-90">
            Empowering students worldwide by simplifying global scholarship
            access and helping them achieve their academic dreams.
          </p>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Who We Are
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto text-center">
          Scholar Stream is an international scholarship discovery and
          application platform that connects students with fully funded,
          partially funded, government, and university-specific opportunities
          worldwide.
          <br />
          <br />
          Our mission is simple: remove barriers, reduce confusion, and help
          every student unlock high-quality education — no matter where they
          come from.
        </p>
      </div>

      {/* OUR MISSION / VISION / VALUES */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* MISSION */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-md hover:shadow-xl transition">
            <div className="text-purple-600 text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To make global scholarships accessible, clear, and achievable for
              every student by providing verified information, tools, and
              guidance.
            </p>
          </div>

          {/* VISION */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-md hover:shadow-xl transition">
            <div className="text-indigo-600 text-5xl mb-4">🌍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become the world’s most trusted platform for students seeking
              academic opportunities, bridging the gap between ambition and
              achievement.
            </p>
          </div>

          {/* VALUES */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 shadow-md hover:shadow-xl transition">
            <div className="text-pink-500 text-5xl mb-4">💎</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Values
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Transparency, fairness, and global empowerment. We aim to support
              students from every nationality with reliable scholarship
              pathways.
            </p>
          </div>
        </div>
      </div>

      {/* KEY FEATURES */}
      <div className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">
          What Makes Us Different
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Feature
            icon="🔍"
            title="Smart Scholarship Search"
            desc="Advanced filters for degree level, field of study, funding amount, country, and requirements."
          />

          <Feature
            icon="🎓"
            title="Verified Information"
            desc="Every scholarship is checked and updated regularly using official portals."
          />

          <Feature
            icon="📅"
            title="Deadline Tracking"
            desc="Stay ahead with live countdowns and automated alerts for closing opportunities."
          />

          <Feature
            icon="📁"
            title="Application Dashboard"
            desc="Save scholarships, track application progress, upload documents, and manage everything in one place."
          />

          <Feature
            icon="🌐"
            title="Global Reach"
            desc="Opportunities from over 40+ countries and 300+ universities worldwide."
          />

          <Feature
            icon="💬"
            title="Real Student Reviews"
            desc="Video testimonials and written feedback to guide students with authentic experiences."
          />
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Meet the Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Scholar Stream is built by passionate educators, designers,
            developers, and scholarship advisors dedicated to transforming
            global education access.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <TeamCard
              img="https://randomuser.me/api/portraits/men/30.jpg"
              name="Arjun Mehta"
              role="Founder & CEO"
            />
            <TeamCard
              img="https://randomuser.me/api/portraits/women/44.jpg"
              name="Sarah Mitchell"
              role="Head of Research"
            />
            <TeamCard
              img="https://randomuser.me/api/portraits/men/55.jpg"
              name="Daniel Carter"
              role="Lead Developer"
            />
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join Thousands of Successful Students
        </h2>
        <p className="text-lg opacity-90 mb-8">
          Start exploring global scholarships today — your future begins with
          one application.
        </p>
        <button className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}

/* ----- SMALL COMPONENTS ----- */
function Feature({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function TeamCard({ img, name, role }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <img
        src={img}
        className="w-28 h-28 object-cover rounded-full mx-auto mb-4 shadow-md"
      />
      <h4 className="text-xl font-semibold text-gray-900">{name}</h4>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
