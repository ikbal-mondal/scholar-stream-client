export default function ContactUsPage() {
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Have questions about scholarships, applications, or partnership
            opportunities? We’re here to help you every step of the way.
          </p>
        </div>
      </div>

      {/* CONTACT INFO GRID */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {/* CARD 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="text-purple-600 text-4xl mb-4">📞</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
          <p className="text-gray-600">Mon–Fri: 9:00 AM – 6:00 PM</p>
        </div>

        {/* CARD 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="text-indigo-600 text-4xl mb-4">📧</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600">support@scholarstream.com</p>
          <p className="text-gray-600">We reply within 24 hours</p>
        </div>

        {/* CARD 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="text-pink-500 text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Office Location
          </h3>
          <p className="text-gray-600">Scholar Stream HQ</p>
          <p className="text-gray-600">San Francisco, CA, USA</p>
        </div>
      </div>

      {/* CONTACT FORM SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Send Us a Message
        </h2>

        <form className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 
                         focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 
                         focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="your@email.com"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 
                         focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white font-semibold rounded-xl 
                       hover:bg-purple-700 transition text-lg"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* GOOGLE MAP */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Find Us on the Map
        </h2>

        <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8437999797075!2d144.95592331531658!3d-37.81720997975178!2m3!1f0!2f0!3f0!3m2
                 !1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e8f5e2ad653!2sScholar%20Stream%20Office!
                 5e0!3m2!1sen!2sus!4v1693000000000"
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-2xl"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
