import {
  UserPlus,
  Search,
  ClipboardList,
  CheckCircle,
  Plane,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserPlus className="w-10 h-10 text-purple-600" />,
    title: "Create an Account",
    description:
      "Sign up on Scholar Stream with your email or Google account to start your scholarship journey.",
  },
  {
    id: 2,
    icon: <Search className="w-10 h-10 text-purple-600" />,
    title: "Browse Scholarships",
    description:
      "Explore hundreds of scholarships worldwide — filter by country, degree, fund type or deadlines to find what suits you.",
  },
  {
    id: 3,
    icon: <ClipboardList className="w-10 h-10 text-purple-600" />,
    title: "Check Eligibility",
    description:
      "Step through the requirements of each scholarship — verify your degree, nationality, language & funding criteria.",
  },
  {
    id: 4,
    icon: <Plane className="w-10 h-10 text-purple-600" />,
    title: "Apply Instantly",
    description:
      "Submit your application with an easy-to-use form; upload necessary documents and apply directly through the platform.",
  },
  {
    id: 5,
    icon: <CheckCircle className="w-10 h-10 text-purple-600" />,
    title: "Get Offer & Enroll",
    description:
      "Receive scholarship offers, confirm acceptance and start your academic journey abroad with confidence.",
  },
];

/**
 * HowItWorks Section
 */
export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          How Scholar Stream Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          A simple 5-step process to find, apply and get accepted for
          scholarships worldwide — no paperwork hassles, just global education
          made easy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              <div className="mt-4 text-purple-600 font-bold">
                Step {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
