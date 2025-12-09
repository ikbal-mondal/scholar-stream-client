import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "./context/AuthProvider";
import api from "./services/api";
import { PlaySquare, Plus } from "lucide-react";

export default function UserProfile() {
  const { backendUser, setBackendUserSafe } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    country: "",
    phone: "",
    dob: "",
    college: "",
    photoURL: "",
  });

  // OPEN MODAL
  const openEditModal = () => {
    setForm({
      name: backendUser.name,
      country: backendUser.country,
      phone: backendUser.phone,
      dob: backendUser.dob,
      college: backendUser.college,
      photoURL: backendUser.photoURL,
    });
    setShowModal(true);
  };

  // CLOUDINARY UPLOAD
  const uploadToCloudinary = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: fd }
      );

      const uploaded = await res.json();

      setForm((prev) => ({ ...prev, photoURL: uploaded.secure_url }));

      Swal.fire("Uploaded!", "Profile picture updated!", "success");
    } catch (err) {
      Swal.fire("Error", "Image upload failed!", "error");
    }

    setUploading(false);
  };

  // UPDATE USER DATA
  const handleUpdate = async () => {
    try {
      const response = await api.patch(`/users/${backendUser._id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data?.success) {
        setBackendUserSafe(response.data.user); // instant UI update
        Swal.fire("Success!", "Profile updated successfully!", "success");
        setShowModal(false);
      } else {
        Swal.fire("Error", "Unexpected server response", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  if (!backendUser)
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );

  // ROLE BADGES
  const roleColor = {
    Admin: "bg-red-100 text-red-700",
    Moderator: "bg-blue-100 text-blue-700",
    Student: "bg-green-100 text-green-700",
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        My Profile
      </h2>

      {/* GLASS CARD */}
      <div className="backdrop-blur-xl bg-white/40 border border-white/20 shadow-xl rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={backendUser.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full object-cover shadow-lg border border-white"
          />

          <div>
            <h3 className="text-2xl font-bold">{backendUser.name}</h3>
            <p className="text-gray-700">{backendUser.email}</p>

            <span
              className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-bold ${
                roleColor[backendUser.role]
              }`}
            >
              {backendUser?.role}
            </span>
          </div>
        </div>

        {/* USER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-800">
          <p>
            <strong>Country:</strong> {backendUser.country}
          </p>
          <p>
            <strong>Phone:</strong> {backendUser.phone}
          </p>
          <p>
            <strong>Date of Birth:</strong> {backendUser.dob}
          </p>
          <p>
            <strong>College:</strong> {backendUser.college}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(backendUser.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={openEditModal}
          className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg"
        >
          Update Profile
        </button>
      </div>

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              Update Profile
            </h2>

            {/* Avatar Section */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-28 h-28">
                {/* Avatar */}
                <img
                  src={form.photoURL}
                  className="w-28 h-28 rounded-full object-cover shadow-md"
                />

                {/* Floating Plus Button */}
                <label
                  htmlFor="avatarInput"
                  className="absolute bottom-1 right-1 bg-primary text-white w-8 h-8 flex items-center 
            justify-center rounded-full text-lg cursor-pointer shadow-md hover:bg-secondary transition"
                >
                  <Plus />
                </label>

                <input
                  type="file"
                  id="avatarInput"
                  className="hidden"
                  accept="image/*"
                  onChange={uploadToCloudinary}
                />
              </div>
            </div>

            {/* Uploading text */}
            {uploading && (
              <p className="text-sm text-purple-600 text-center -mt-4 mb-4">
                Uploading...
              </p>
            )}

            {/* FORM FIELDS — NOW 2 COLUMN RESPONSIVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Full name
                </label>
                <input
                  className="border p-3 rounded-lg mt-1 focus:ring focus:ring-purple-200 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Country
                </label>
                <input
                  className="border p-3 rounded-lg mt-1 focus:ring focus:ring-purple-200 outline-none"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  placeholder="Enter country"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  className="border p-3 rounded-lg mt-1 focus:ring focus:ring-purple-200 outline-none"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Date of birth
                </label>
                <input
                  type="date"
                  className="border p-3 rounded-lg mt-1 focus:ring focus:ring-purple-200 outline-none"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>

              {/* Address / College — FULL WIDTH FIELD */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Address / College
                </label>
                <input
                  className="border p-3 rounded-lg mt-1 focus:ring focus:ring-purple-200 outline-none"
                  value={form.college}
                  onChange={(e) =>
                    setForm({ ...form, college: e.target.value })
                  }
                  placeholder="Address or College Name"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="w-1/2 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
