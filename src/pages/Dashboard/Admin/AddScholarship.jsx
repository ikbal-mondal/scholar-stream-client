// src/pages/Dashboard/Admin/AddScholarship.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../services/api";
import { UploadCloud } from "lucide-react";

const AddScholarship = () => {
  const [form, setForm] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",

    // NEW FIELDS
    scholarshipDescription: "",
    stipendCoverage: "",
    tuitionFees: "",
    eligibilityCriteria: "",
    requiredDocuments: "",
    location: "",
  });

  const [uploading, setUploading] = useState(false);

  // ---------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Auto-generate location
    if (["universityCity", "universityCountry"].includes(e.target.name)) {
      setForm((prev) => ({
        ...prev,
        location: `${prev.universityCity || ""}, ${
          prev.universityCountry || ""
        }`.trim(),
      }));
    }
  };

  // ---------------------------
  // IMAGE UPLOAD HANDLING
  // ---------------------------
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const uploadFile = async (file) => {
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

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");

      setForm((prev) => ({ ...prev, universityImage: data.secure_url }));

      Swal.fire("Uploaded", "Image uploaded successfully!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------
  // SUBMIT FORM
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/scholarships", form);

      Swal.fire({
        icon: "success",
        title: "Added Successfully 🎉",
        text: "Scholarship has been added.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset form
      setForm({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        scholarshipDescription: "",
        stipendCoverage: "",
        tuitionFees: "",
        eligibilityCriteria: "",
        requiredDocuments: "",
        location: "",
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Could not add scholarship.",
        "error"
      );
    }
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-primary">Add Scholarship</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* BASIC INPUTS */}
        <input
          required
          name="scholarshipName"
          placeholder="Scholarship Name"
          value={form.scholarshipName}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          required
          name="universityName"
          placeholder="University Name"
          value={form.universityName}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          required
          name="universityCountry"
          placeholder="Country"
          value={form.universityCountry}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          required
          name="universityCity"
          placeholder="City"
          value={form.universityCity}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          name="universityWorldRank"
          placeholder="World Rank"
          value={form.universityWorldRank}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          required
          name="subjectCategory"
          placeholder="Subject Category"
          value={form.subjectCategory}
          onChange={handleChange}
          className="input-modern"
        />

        {/* DROPDOWNS */}
        <select
          name="scholarshipCategory"
          value={form.scholarshipCategory}
          onChange={handleChange}
          className="input-modern"
        >
          <option value="">Scholarship Category</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self Fund">Self Fund</option>
        </select>

        <select
          name="degree"
          value={form.degree}
          onChange={handleChange}
          className="input-modern"
        >
          <option value="">Degree Level</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input
          name="applicationFees"
          placeholder="Application Fees"
          value={form.applicationFees}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          name="serviceCharge"
          placeholder="Service Charge"
          value={form.serviceCharge}
          onChange={handleChange}
          className="input-modern"
        />

        <input
          required
          type="date"
          name="applicationDeadline"
          value={form.applicationDeadline}
          onChange={handleChange}
          className="input-modern"
        />

        {/* LARGE TEXT FIELDS */}
        <textarea
          name="scholarshipDescription"
          placeholder="Scholarship Description"
          value={form.scholarshipDescription}
          onChange={handleChange}
          className="input-modern col-span-2 h-32"
        />

        <input
          name="stipendCoverage"
          placeholder="Stipend / Coverage Details"
          value={form.stipendCoverage}
          onChange={handleChange}
          className="input-modern col-span-2"
        />

        <input
          name="tuitionFees"
          placeholder="Tuition Fees (optional)"
          value={form.tuitionFees}
          onChange={handleChange}
          className="input-modern col-span-2"
        />

        <textarea
          name="eligibilityCriteria"
          placeholder="Eligibility Criteria (optional)"
          value={form.eligibilityCriteria}
          onChange={handleChange}
          className="input-modern col-span-2 h-28"
        />

        <textarea
          name="requiredDocuments"
          placeholder="Required Documents (optional)"
          value={form.requiredDocuments}
          onChange={handleChange}
          className="input-modern col-span-2 h-28"
        />

        <input
          name="location"
          placeholder="Location (auto-generated)"
          value={form.location}
          onChange={handleChange}
          className="input-modern col-span-2"
        />

        {/* IMAGE UPLOAD */}
        <div className="col-span-2">
          <label className="font-semibold mb-2 block">University Image</label>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
            className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            {!form.universityImage ? (
              <div>
                <UploadCloud size={40} className="mx-auto text-gray-500" />
                <p className="text-gray-600 mt-2">
                  Drag & drop OR click to upload
                </p>

                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={form.universityImage}
                  className="w-40 rounded shadow"
                />

                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, universityImage: "" }))
                  }
                >
                  Remove Image
                </button>
              </div>
            )}

            {uploading && (
              <p className="text-blue-600 font-semibold mt-3">
                Uploading image...
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="btn-primary col-span-2 py-3 text-lg">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
