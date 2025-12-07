import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";

const EditScholarship = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  const loadData = async () => {
    const res = await api.get(`/admin/scholarships/${id}`);
    setForm(res.data.scholarship);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!form) return <p>Loading...</p>;

  const updateScholarship = async (e) => {
    e.preventDefault();
    await api.put(`/admin/scholarships/${id}`, form);
    Swal.fire("Updated!", "Scholarship updated successfully", "success");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Scholarship</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={updateScholarship}
      >
        {Object.keys(form).map(
          (key) =>
            key !== "_id" &&
            key !== "universityImage" && (
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                className="input input-bordered"
              />
            )
        )}

        <button className="btn btn-primary col-span-2">Update</button>
      </form>
    </div>
  );
};

export default EditScholarship;
