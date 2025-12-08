import { useState } from "react";
import {
  HelpCircle,
  Globe2,
  BadgeCheck,
  BookOpen,
  Search,
  School,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

// ---------------- SHORT 50-WORD ANSWERS ---------------- //
const faqData = [
  {
    id: 1,
    icon: <Globe2 className="w-7 h-7 text-white" />,
    question: "What is Scholar Stream?",
    answer:
      "Scholar Stream is a modern platform that helps students discover and apply for global scholarships easily. It simplifies searching, tracking, and understanding eligibility. With organized details and personalized recommendations, it saves time and ensures students find relevant funding opportunities with clarity and confidence.",
  },
  {
    id: 2,
    icon: <BadgeCheck className="w-7 h-7 text-white" />,
    question: "Are scholarships always fully funded?",
    answer:
      "Not all scholarships are fully funded. Some cover tuition and living costs, while others offer partial benefits. Scholar Stream clearly labels each program, helping students compare funding levels and choose options matching their financial needs and academic plans.",
  },
  {
    id: 3,
    icon: <BookOpen className="w-7 h-7 text-white" />,
    question: "Do I need IELTS for every scholarship?",
    answer:
      "No. Many scholarships accept students without IELTS if they meet alternative English proficiency requirements. Scholar Stream’s filters help students quickly find opportunities that do not require standardized English tests.",
  },
  {
    id: 4,
    icon: <Search className="w-7 h-7 text-white" />,
    question: "How can I find scholarships based on my profile?",
    answer:
      "Use filters like degree level, nationality, funding type, deadlines, and study field. Scholar Stream’s smart system suggests scholarships aligned with your background and ambitions.",
  },
  {
    id: 5,
    icon: <School className="w-7 h-7 text-white" />,
    question: "Can international students apply?",
    answer:
      "Yes. Scholar Stream lists scholarships globally, allowing international students to filter opportunities available for their nationality and academic background.",
  },
  {
    id: 6,
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
    question: "How reliable is the information?",
    answer:
      "All scholarship details are updated regularly and verified through official portals, ensuring accurate results regarding eligibility, deadlines, benefits, and application procedures.",
  },
  {
    id: 7,
    icon: <HelpCircle className="w-7 h-7 text-white" />,
    question: "How does the dashboard help me?",
    answer:
      "The dashboard allows students to save scholarships, track deadlines, manage applications, and receive reminders. It centralizes your scholarship journey in one organized space.",
  },
];

export default function FAQSectionV3() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-2">
            Find answers to common scholarship-related questions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search FAQ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFAQs.map((faq, index) => (
            <div
              key={faq.id}
              className="rounded-2xl bg-white shadow-sm border border-gray-200 
                         hover:shadow-md transition-all duration-300 p-5"
            >
              {/* Top Row */}
              <div className="flex items-start gap-4">
                {/* Left Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             bg-gradient-to-br from-purple-500 to-purple-700 text-white
                             shadow-md"
                >
                  {faq.icon}
                </div>

                {/* Question + Answer */}
                <div className="flex-1">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>

                    <ChevronDown
                      className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
