import { useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

export default function ContactUsPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const res = await api.post("/contact", { name, email, message });

      if (res.data.success) {
        Swal.fire("Success!", "Your message has been sent.", "success");
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send message", "error");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Have questions? We’re here to help you every step of the way.
          </p>
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {/* CARD 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="text-purple-600 text-4xl mb-4">📞</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
          <p className="text-gray-600">Mon–Fri: 9:00 AM – 6:00 PM</p>
        </div>

        {/* CARD 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="text-indigo-600 text-4xl mb-4">📧</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600">support@scholarstream.com</p>
          <p className="text-gray-600">We reply within 24 hours</p>
        </div>

        {/* CARD 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="text-pink-500 text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Office</h3>
          <p className="text-gray-600">Scholar Stream HQ</p>
          <p className="text-gray-600">San Francisco, CA</p>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Send Us a Message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border space-y-6"
        >
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              required
              name="name"
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
              required
              name="email"
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
              required
              name="message"
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 
                         focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white text-lg font-semibold 
                       rounded-xl hover:bg-purple-700 transition shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
