// src/pages/Dashboard/Admin/ManageScholarships.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import {
  Search,
  Trash2,
  Pencil,
  Loader2,
  Eye,
  X,
  UploadCloud,
  GraduationCap,
  Layers,
  BookOpen,
  Calendar,
  Trophy,
  DollarSign,
  Receipt,
  FileText,
  Coins,
  MapPin,
  UserCheck,
  FolderOpen,
} from "lucide-react";
import Swal from "sweetalert2";

const PAGE_LIMIT = 10;

const ManageScholarships = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & pagination
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");

  // Modals
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [editLoading, setEditLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit form state
  const initialForm = {
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
  };

  const [form, setForm] = useState(initialForm);

  // ------------------ LOAD SCHOLARSHIPS ------------------
  const loadScholarships = async () => {
    try {
      setLoading(true);

      const res = await api.get("/scholarships", {
        params: {
          q: search || undefined,
          degree: degree || undefined,
          category: category || undefined,
          country: country || undefined,
          page,
          limit: PAGE_LIMIT,
        },
      });

      setData(res.data.results || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Load error:", err);
      Swal.fire("Error", "Could not load scholarships", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScholarships();
  }, [search, degree, category, country, page]);

  // ------------------ DELETE ------------------
  const deleteScholarship = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/scholarships/${id}`);
      Swal.fire("Deleted", "Scholarship removed", "success");
      loadScholarships();
    } catch (err) {
      Swal.fire("Error", "Could not delete scholarship", "error");
    }
  };

  // ------------------ VIEW MODAL ------------------
  const openView = (item) => setViewItem(item);
  const closeView = () => setViewItem(null);

  // ------------------ EDIT MODAL ------------------
  const openEdit = (item) => {
    setEditItem(item);

    setForm({
      scholarshipName: item.scholarshipName || "",
      universityName: item.universityName || "",
      universityImage: item.universityImage || "",
      universityCountry: item.universityCountry || "",
      universityCity: item.universityCity || "",
      universityWorldRank: item.universityWorldRank || "",
      subjectCategory: item.subjectCategory || "",
      scholarshipCategory: item.scholarshipCategory || "",
      degree: item.degree || "",
      applicationFees: item.applicationFees || "",
      serviceCharge: item.serviceCharge || "",
      applicationDeadline: item.applicationDeadline
        ? item.applicationDeadline.slice(0, 10)
        : "",
      scholarshipDescription: item.scholarshipDescription || "",
      stipendCoverage: item.stipendCoverage || "",
      tuitionFees: item.tuitionFees || "",
      eligibilityCriteria: item.eligibilityCriteria || "",
      requiredDocuments: item.requiredDocuments || "",
      location: item.location || "",
    });
  };

  const closeEdit = () => {
    setEditItem(null);
    setForm(initialForm);
  };

  // ------------------ EDIT FORM CHANGE ------------------
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ------------------ CLOUDINARY UPLOAD ------------------
  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: fd }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");

      setForm((prev) => ({ ...prev, universityImage: data.secure_url }));
      Swal.fire("Uploaded", "Image uploaded successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  // ------------------ SUBMIT EDIT ------------------
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editItem) return;

    try {
      setEditLoading(true);

      await api.put(`/scholarships/${editItem._id}`, form);

      Swal.fire("Updated", "Scholarship updated successfully", "success");

      closeEdit();
      loadScholarships();
    } catch (err) {
      Swal.fire("Error", "Could not update scholarship", "error");
    } finally {
      setEditLoading(false);
    }
  };

  // Format date
  const displayDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleDateString();
  };

  // -------------------------------------------------------
  // ---------------------- UI START -----------------------
  // -------------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Manage Scholarships (Total: {total})
        </h2>

        <Link
          to="/dashboard/add-scholarship"
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
        >
          + Add Scholarship
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center border rounded-lg px-3">
          <Search className="text-gray-400 mr-2" />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full py-2 outline-none"
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Degrees</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self Fund">Self Fund</option>
        </select>

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Filter Country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        {loading ? (
          <div className="py-10 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : data.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No scholarships found.
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">University</th>
                <th className="p-4 text-left">Scholarship</th>
                <th className="p-4 text-left">Degree</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Deadline</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    {s.universityImage ? (
                      <img
                        src={s.universityImage}
                        className="w-10 h-10 object-cover rounded"
                        alt=""
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded text-xs">
                        No
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{s.universityName}</div>
                      <div className="text-xs text-gray-500">
                        {s.universityCountry}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{s.scholarshipName}</td>
                  <td className="p-4">{s.degree}</td>
                  <td className="p-4">{s.scholarshipCategory}</td>
                  <td className="p-4">{displayDate(s.applicationDeadline)}</td>

                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openView(s)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => openEdit(s)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteScholarship(s._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} — Total {total} items
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* ---------------- VIEW MODAL ---------------- */}

      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeView}
          />

          {/* modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0 z-10">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
              onClick={closeView}
            >
              <X size={26} />
            </button>

            {/* HEADER WITH IMAGE */}
            <div className="p-6 flex flex-col md:flex-row gap-6 ">
              {/* image */}
              <div className="md:w-1/3 flex justify-center">
                {viewItem?.universityImage ? (
                  <img
                    src={viewItem?.universityImage}
                    className="w-48 h-48 md:w-full md:h-56 object-cover rounded-xl shadow-md"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* title section */}
              <div className="flex-1 md:w-2/3">
                <h2 className="text-3xl font-bold">
                  {viewItem?.scholarshipName}
                </h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base flex gap-1">
                  <span>{viewItem?.universityName}</span> •
                  <span>{viewItem?.universityCountry}</span>
                  {viewItem?.universityCity && (
                    <>
                      • <span>{viewItem?.universityCity}</span>
                    </>
                  )}
                </p>

                {/* quick info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                  <p className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-primary" />
                    <strong>Degree:</strong> {viewItem?.degree || "-"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Layers size={18} className="text-primary" />
                    <strong>Category:</strong>{" "}
                    {viewItem.scholarshipCategory || "-"}
                  </p>

                  <p className="flex items-center gap-2">
                    <BookOpen size={18} className="text-primary" />
                    <strong>Subject:</strong> {viewItem?.subjectCategory || "-"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <strong>Deadline:</strong>{" "}
                    {displayDate(viewItem.applicationDeadline)}
                  </p>

                  <p className="flex items-center gap-2">
                    <Trophy size={18} className="text-primary" />
                    <strong>World Rank:</strong>{" "}
                    {viewItem?.universityWorldRank || "-"}
                  </p>

                  <p className="flex items-center gap-2">
                    <DollarSign size={18} className="text-primary" />
                    <strong>Application Fees:</strong>{" "}
                    {viewItem.applicationFees || "-"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Receipt size={18} className="text-primary" />
                    <strong>Service Charge:</strong>{" "}
                    {viewItem?.serviceCharge || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="flex  text-sm font-medium overflow-x-auto">
              {["Overview", "Eligibility", "Documents"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 whitespace-nowrap  transition 
              ${
                activeTab === tab
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-gray-500"
              }
            `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 bg-purple-100 text-sm leading-relaxed text-gray-700">
              {/* OVERVIEW TAB */}
              {activeTab === "Overview" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 flex gap-2 items-center">
                      <FileText size={18} className="text-primary" />{" "}
                      Description
                    </h4>
                    <p className="mt-1 whitespace-pre-line">
                      {viewItem.scholarshipDescription ||
                        "No description provided."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 flex gap-2 items-center">
                      <Coins size={18} className="text-primary" /> Stipend /
                      Coverage
                    </h4>
                    <p className="mt-1 whitespace-pre-line">
                      {viewItem.stipendCoverage || "-"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 flex gap-2 items-center">
                      <MapPin size={18} className="text-primary" /> Location
                    </h4>
                    <p className="mt-1 whitespace-pre-line">
                      {viewItem.location || "-"}
                    </p>
                  </div>
                </div>
              )}

              {/* ELIGIBILITY TAB */}
              {activeTab === "Eligibility" && (
                <div>
                  <h4 className="font-semibold text-gray-900 flex gap-2 items-center">
                    <UserCheck size={18} className="text-primary " />{" "}
                    Eligibility Criteria
                  </h4>
                  <p className="mt-3 whitespace-pre-line">
                    {viewItem.eligibilityCriteria ||
                      "No eligibility information provided."}
                  </p>
                </div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === "Documents" && (
                <div>
                  <h4 className="font-semibold text-gray-900 flex gap-2 items-center">
                    <FolderOpen size={18} className="text-primary" /> Required
                    Documents
                  </h4>
                  <p className="mt-3 whitespace-pre-line">
                    {viewItem.requiredDocuments || "No documents specified."}
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-6  flex justify-end">
              <button
                onClick={closeView}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

          <div className="relative bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-lg">
            <button className="absolute top-4 right-4" onClick={closeEdit}>
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4">Edit Scholarship</h3>

            <form
              onSubmit={submitEdit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* INPUTS */}
              <input
                name="scholarshipName"
                value={form.scholarshipName}
                onChange={handleChange}
                placeholder="Scholarship Name"
                className="border px-3 py-2 rounded"
                required
              />

              <input
                name="universityName"
                value={form.universityName}
                onChange={handleChange}
                placeholder="University Name"
                className="border px-3 py-2 rounded"
                required
              />

              <input
                name="universityCountry"
                value={form.universityCountry}
                onChange={handleChange}
                placeholder="Country"
                className="border px-3 py-2 rounded"
              />

              <input
                name="universityCity"
                value={form.universityCity}
                onChange={handleChange}
                placeholder="City"
                className="border px-3 py-2 rounded"
              />

              <input
                name="universityWorldRank"
                value={form.universityWorldRank}
                onChange={handleChange}
                placeholder="World Rank"
                className="border px-3 py-2 rounded"
              />

              <input
                name="subjectCategory"
                value={form.subjectCategory}
                onChange={handleChange}
                placeholder="Subject Category"
                className="border px-3 py-2 rounded"
              />

              <select
                name="scholarshipCategory"
                value={form.scholarshipCategory}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
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
                className="border px-3 py-2 rounded"
              >
                <option value="">Degree Level</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>

              <input
                name="applicationFees"
                value={form.applicationFees}
                onChange={handleChange}
                placeholder="Application Fees"
                className="border px-3 py-2 rounded"
              />

              <input
                name="serviceCharge"
                value={form.serviceCharge}
                onChange={handleChange}
                placeholder="Service Charge"
                className="border px-3 py-2 rounded"
              />

              <input
                type="date"
                name="applicationDeadline"
                value={form.applicationDeadline}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />

              {/* TEXTAREAS */}
              <div className="md:col-span-2">
                <label>Description</label>
                <textarea
                  name="scholarshipDescription"
                  value={form.scholarshipDescription}
                  onChange={handleChange}
                  rows={3}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label>Stipend / Coverage</label>
                <textarea
                  name="stipendCoverage"
                  value={form.stipendCoverage}
                  onChange={handleChange}
                  rows={2}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <input
                name="tuitionFees"
                value={form.tuitionFees}
                onChange={handleChange}
                placeholder="Tuition Fees"
                className="border px-3 py-2 rounded"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="border px-3 py-2 rounded"
              />

              <div className="md:col-span-2">
                <label>Eligibility Criteria</label>
                <textarea
                  name="eligibilityCriteria"
                  value={form.eligibilityCriteria}
                  onChange={handleChange}
                  rows={3}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label>Required Documents</label>
                <textarea
                  name="requiredDocuments"
                  value={form.requiredDocuments}
                  onChange={handleChange}
                  rows={3}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="md:col-span-2">
                <label>University Image</label>

                <div
                  className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document.getElementById("fileInputEdit")?.click()
                  }
                >
                  {!form.universityImage ? (
                    <div>
                      <UploadCloud
                        size={32}
                        className="mx-auto text-gray-400"
                      />
                      <p className="text-sm mt-2">
                        Drag & drop or click to upload
                      </p>
                      <input
                        type="file"
                        id="fileInputEdit"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={form.universityImage}
                        className="w-40 rounded shadow"
                      />

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              universityImage: "",
                            }))
                          }
                          className="border px-3 py-1 rounded text-red-500"
                        >
                          Remove
                        </button>

                        <label className="border px-3 py-1 rounded cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          Change
                        </label>
                      </div>
                    </div>
                  )}

                  {uploading && (
                    <p className="text-blue-600 font-semibold mt-2">
                      Uploading...
                    </p>
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2 bg-primary text-white rounded"
                >
                  {editLoading ? "Saving..." : "Update Scholarship"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
