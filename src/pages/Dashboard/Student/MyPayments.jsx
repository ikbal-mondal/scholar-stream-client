import React, { useEffect, useState, useContext } from "react";

import { Receipt, CheckCircle, User, University } from "lucide-react";
import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

export default function MyPayments() {
  const { backendUser } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (backendUser?.email) loadPayments();
  }, [backendUser?.email]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/payments/student/${backendUser.email}`);
      setPayments(data || []);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Receipt className="text-primary" /> My Payment History
      </h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">University</th>
                <th className="p-3 text-left">Scholarship</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {/* Student Info */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={backendUser?.photoURL}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="student"
                      />
                      <div>
                        <p className="font-semibold">{p.userName}</p>
                        <p className="text-gray-500 text-xs">{p.userEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* University */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.universityImage}
                        className="w-14 h-10 rounded object-cover border"
                        alt="uni"
                      />
                      <div>
                        <p className="font-semibold">{p.universityName}</p>
                        <p className="text-gray-500 text-xs">
                          {p.universityCountry}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Scholarship */}
                  <td className="p-3">{p.scholarshipName}</td>

                  {/* Amount */}
                  <td className="p-3 font-semibold text-primary">
                    ₹ {p.totalAmount}
                  </td>

                  {/* Date */}
                  <td className="p-3">
                    {new Date(p.applicationDate).toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <CheckCircle size={16} /> Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
