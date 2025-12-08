// src/pages/Auth/Register.jsx

import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../context/AuthProvider";

const Register = () => {
  const { register, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    dob: "",
    photoURL: "",
    college: "",
  });

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const countries = [
    "India",
    "Bangladesh",
    "Pakistan",
    "America",
    "Saudi Arabia",
    "New York",
    "Qatar",
    "Nepal",
    "Sri Lanka",
    "Dubai",
  ];

  /* ----------------------------- HANDLE INPUT ----------------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* --------------------------- CLOUDINARY UPLOAD -------------------------- */
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.secure_url) {
        setForm({ ...form, photoURL: result.secure_url });
        Swal.fire("Uploaded!", "Photo uploaded successfully!", "success");
      } else {
        Swal.fire("Error", "Image upload failed!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed!", "error");
    }

    setUploading(false);
  };

  /* ------------------------------- VALIDATION ------------------------------ */
  const validate = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.country ||
      !form.phone ||
      !form.dob ||
      !form.photoURL ||
      !form.college
    ) {
      Swal.fire("Error", "All fields are required!", "error");
      return false;
    }

    if (form.password.length < 6) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters",
        "warning"
      );
      return false;
    }

    return true;
  };

  /* ---------------------------- SUBMIT FORM ------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // 1️⃣ Create Firebase account
      await register(form.name, form.email, form.password);

      // 2️⃣ Send extended profile data to backend
      await api.post("/auth/register-user", form);

      // 3️⃣ Auto-login user so backend returns JWT + user data
      await login(form.email, form.password);

      Swal.fire("Success", "Account created successfully!", "success");

      // 4️⃣ Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Unable to create account!", "error");
    }
  };

  /* ------------------------------- UI RETURN ------------------------------- */
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-10 mt-10">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Create Your <span className="text-secondary">Account</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          type="text"
          placeholder="Full Name *"
          className="input input-bordered w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 6) *"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="country"
          className="select select-bordered w-full"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country *</option>
          {countries.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          name="phone"
          type="text"
          placeholder="Phone Number *"
          className="input input-bordered w-full"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="dob"
          type="date"
          className="input input-bordered w-full"
          value={form.dob}
          onChange={handleChange}
          required
        />

        {/* CLOUDINARY UPLOAD UI */}
        <div className="border-2 border-primary border-dashed rounded-lg p-6 text-center cursor-pointer">
          <label className="cursor-pointer">
            <span className="block text-gray-400 mb-2">
              {" "}
              Choses Your Photo then stay some seconds we will upload it for you
              automatically *
            </span>

            <input
              type="file"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            <div className="px-4 py-2 bg-primary text-white rounded-md inline-block">
              Upload Photo
            </div>
          </label>

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          )}

          {form.photoURL && (
            <img
              src={form.photoURL}
              className="mt-4 w-28 h-28 rounded-full object-cover mx-auto shadow"
            />
          )}
        </div>

        <input
          name="college"
          type="text"
          placeholder="College / School Name *"
          className="input input-bordered w-full"
          value={form.college}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Account"}
        </button>
        <span className="text-secondary">
          Already hove a Account{" "}
          <Link to="/login" className="text-primary underline">
            Login Now
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
