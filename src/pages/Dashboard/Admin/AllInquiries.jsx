import React, { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";
import api from "../../../services/api";

export default function AllInquiries() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const res = await api.get("/contact");
    setItems(res.data || []);
    setFiltered(res.data || []);
  };

  const deleteItem = async (id) => {
    const yes = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!yes.isConfirmed) return;

    const res = await api.delete(`/contact/${id}`);
    if (res.data.success) {
      Swal.fire("Deleted!", "Inquiry removed.", "success");
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔍 SEARCH FILTER
  useEffect(() => {
    const s = search.toLowerCase();
    const result = items.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.message.toLowerCase().includes(s)
    );
    setFiltered(result);
  }, [search, items]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Inquiries ({filtered.length})
        </h2>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search inquiries..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="p-3 font-medium">Sl No</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-primary/10 hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                }`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(item.createdAt)
                  )}
                </td>
                <td className="p-3 text-right flex justify-end gap-4">
                  {/* VIEW BUTTON */}
                  <button
                    onClick={() => setSelected(item)}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                    title="View details"
                  >
                    <Eye size={20} />
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete inquiry"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-600">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Inquiry Details
            </h3>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Received:</strong>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </p>

              <div className="mt-4 p-4 bg-gray-100 rounded-xl text-gray-800 shadow-inner">
                {selected.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
