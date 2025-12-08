import { ArrowRight, UserPlus, GraduationCap } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col lg:flex-row">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 h-64 lg:h-auto">
            <img
              src="https://ik.imagekit.io/7wgh8xbqy/free-loan-advice_gbpV7w_9-.webp"
              alt="Scholarship CTA"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-2xl backdrop-blur-lg mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl font-bold leading-snug mb-4">
              Start Your Global Education Journey Today
            </h2>

            <p className="text-white/90 text-lg mb-8">
              Register now and explore top scholarships, personalized
              recommendations, expert guidance, and fast application processing
              — everything you need to study abroad successfully.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/register"
                className="px-6 py-3 flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
              >
                <UserPlus className="w-5 h-5" /> Register Now
              </a>

              <a
                href="/all-scholarships"
                className="px-6 py-3 flex items-center gap-2 bg-purple-900/40 border border-white/40 
                           backdrop-blur-md text-white font-semibold rounded-xl hover:bg-purple-900/60 transition"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
