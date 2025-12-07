import React, { useEffect, useState, useContext } from "react";
import {
  Star,
  Edit,
  Trash2,
  School,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

export default function MyReviews() {
  const { backendUser } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----- EDIT MODAL -----
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  // ===========================================================
  // LOAD REVIEW DATA
  // ===========================================================
  useEffect(() => {
    if (backendUser?.email) loadMyReviews();
  }, [backendUser?.email]);

  const loadMyReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/my-reviews/${backendUser.email}`);
      setReviews(data || []);
    } catch (err) {
      console.error("Error loading reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===========================================================
  // DELETE REVIEW
  // ===========================================================
  const deleteReview = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Review?",
      text: "This action is permanent.",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/reviews/${id}`);
      Swal.fire("Deleted", "Review removed successfully", "success");
      loadMyReviews();
    } catch (err) {
      Swal.fire("Error", "Could not delete review", "error");
    }
  };

  // ===========================================================
  // OPEN EDIT MODAL
  // ===========================================================
  const openEditModal = (item) => {
    setEditItem(item);
    setEditRating(item.ratingPoint);
    setEditComment(item.reviewComment);
    setEditModal(true);
  };

  // ===========================================================
  // UPDATE REVIEW
  // ===========================================================
  const updateReview = async () => {
    if (!editRating || editComment.trim() === "") {
      return Swal.fire(
        "Missing fields",
        "Rating & comment required",
        "warning"
      );
    }

    try {
      await api.patch(`/reviews/${editItem._id}`, {
        ratingPoint: editRating,
        reviewComment: editComment,
      });

      Swal.fire("Updated", "Review updated successfully!", "success");
      setEditModal(false);
      loadMyReviews();
    } catch (err) {
      Swal.fire("Error", "Could not update review", "error");
    }
  };

  // ===========================================================
  // RENDER STARS
  // ===========================================================
  const Stars = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={
            s <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  // ===========================================================
  // MAIN UI
  // ===========================================================
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <GraduationCap className="text-primary" />
        My Reviews
      </h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You haven't written any reviews yet.
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white border shadow-sm hover:shadow-md transition p-5 rounded-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <School className="text-purple-600" />
                    {r.universityName}
                  </h3>

                  <p className="text-gray-600 text-sm">{r.scholarshipName}</p>

                  <div className="mt-2">
                    <Stars rating={r.ratingPoint} />
                  </div>

                  <p className="mt-3 text-sm text-gray-700 border-l-4 border-primary pl-3 italic">
                    “{r.reviewComment}”
                  </p>

                  <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(r.reviewDate).toLocaleString()}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col items-center gap-3 ml-4">
                  <button
                    onClick={() => openEditModal(r)}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteReview(r._id)}
                    className="p-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===========================================================
          EDIT REVIEW MODAL
      =========================================================== */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditModal(false)}
              className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Review</h2>

            {/* Rating */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  onClick={() => setEditRating(star)}
                  className={`cursor-pointer ${
                    star <= editRating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              className="w-full border rounded-lg p-3 h-28 outline-none focus:ring"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <button
              onClick={updateReview}
              className="mt-4 bg-primary text-white w-full py-2 rounded-lg hover:bg-primary/90"
            >
              Update Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
