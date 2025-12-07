import React, { useEffect, useState, useContext } from "react";
import {
  Receipt,
  Search,
  Eye,
  Download,
  User,
  Building2,
  GraduationCap,
  CalendarDays,
  DollarSign,
} from "lucide-react";

import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

pdfMake.vfs = vfsFonts.vfs;

export default function MyPayments() {
  const { backendUser } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [viewItem, setViewItem] = useState(null);
  const [downloading, setDownloading] = useState(false); // 🔥 Spinner State

  useEffect(() => {
    if (backendUser?.email) loadPayments();
  }, [backendUser?.email]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/payments/student/${backendUser.email}`);
      setPayments(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  };

  // ------------- SEARCH --------------------
  useEffect(() => {
    setFiltered(
      payments.filter(
        (p) =>
          p.scholarshipName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.universityName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  // ================================
  // Convert Image URL → BASE64
  // ================================
  const convertToBase64 = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Image Base64 Error:", err);
      return null;
    }
  };

  // ===========================================
  // PREMIUM INVOICE PDF GENERATOR
  // ===========================================
  const downloadInvoice = async (p) => {
    try {
      setDownloading(true);

      // Convert images to base64
      const uniImg = p.universityImage
        ? await convertToBase64(p.universityImage)
        : null;

      const studentImg = backendUser?.photoURL
        ? await convertToBase64(backendUser.photoURL)
        : null;

      const paidDate =
        p.paymentInfo?.paidAt || p.paymentDate || p.applicationDate;

      const doc = {
        pageSize: "A4",
        pageMargins: [40, 40, 40, 60],

        content: [
          // HEADER
          {
            columns: [
              {
                width: "*",
                stack: [
                  { text: "Scholar Stream", style: "brand" },
                  { text: "Official Payment Invoice", style: "header" },
                ],
              },

              uniImg
                ? {
                    width: 120,
                    image: uniImg,
                    fit: [120, 70],
                    alignment: "right",
                  }
                : { text: "" },
            ],
          },

          { text: "\n" },

          // Meta Details
          {
            columns: [
              {
                stack: [
                  { text: "Invoice Number:", bold: true },
                  { text: `#${p._id}` },
                ],
              },

              {
                stack: [
                  { text: "Payment Date:", bold: true },
                  { text: new Date(paidDate).toLocaleString() },
                ],
                alignment: "right",
              },
            ],
          },

          { text: "\n\n" },

          // Student / University Info
          {
            columns: [
              {
                width: "55%",
                style: "infoBox",
                table: {
                  widths: ["40%", "60%"],
                  body: [
                    [{ text: "Student Name", bold: true }, p.userName],
                    [{ text: "Email", bold: true }, p.userEmail],
                    [{ text: "Scholarship", bold: true }, p.scholarshipName],
                  ],
                },
              },

              {
                width: "45%",
                style: "infoBox",
                table: {
                  widths: ["40%", "60%"],
                  body: [
                    [{ text: "University", bold: true }, p.universityName],
                    [{ text: "Country", bold: true }, p.universityCountry],
                    [{ text: "Currency", bold: true }, "USD"],
                  ],
                },
              },
            ],
          },

          { text: "\n\n" },

          // AMOUNT TABLE
          {
            table: {
              widths: ["60%", "40%"],
              body: [
                [
                  { text: "DESCRIPTION", bold: true },
                  { text: "AMOUNT (USD)", bold: true, alignment: "right" },
                ],
                ["Application Fees", `$${p.applicationFees}`],
                ["Service Charge", `$${p.serviceCharge}`],
                [
                  { text: "TOTAL PAID", bold: true },
                  { text: `$${p.totalAmount}`, bold: true, alignment: "right" },
                ],
              ],
            },
          },

          { text: "\n\n\n" },

          // Signature
          {
            columns: [
              {
                width: "*",
                text: "_________________________\nAuthorized Signature",
                alignment: "left",
              },
              {
                width: "*",
                text: "Thank you for choosing Scholar Stream!",
                alignment: "right",
                italics: true,
              },
            ],
          },
        ],

        styles: {
          brand: { fontSize: 22, bold: true, color: "#6d28d9" },
          header: { fontSize: 16 },
          infoBox: { margin: [0, 0, 0, 10] },
        },
      };

      pdfMake.createPdf(doc).download(`invoice-${p._id}.pdf`);
    } catch (err) {
      console.error("Invoice Error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Receipt className="text-primary" /> My Payment History
      </h2>

      {/* SEARCH */}
      <div className="flex items-center gap-2 mb-4 max-w-sm">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search scholarship or university..."
          className="w-full border rounded-lg px-3 py-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl shadow-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">University</th>
              <th className="p-3 text-left">Scholarship</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Paid On</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                {/* Student */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={backendUser?.photoURL}
                      className="w-10 h-10 rounded-full object-cover"
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
                    />
                    <div>
                      <p className="font-semibold">{p.universityName}</p>
                      <p className="text-gray-500 text-xs">
                        {p.universityCountry}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3">{p.scholarshipName}</td>

                <td className="p-3 font-bold text-primary">${p.totalAmount}</td>

                <td className="p-3">
                  {new Date(
                    p.paymentInfo?.paidAt || p.paymentDate || p.applicationDate
                  ).toLocaleString()}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => setViewItem(p)}
                    className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                  >
                    <Eye size={16} /> View
                  </button>

                  <button
                    onClick={() => downloadInvoice(p)}
                    className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                    disabled={downloading}
                  >
                    {downloading ? "Processing..." : <Download size={16} />}
                    {downloading ? "Generating..." : "Invoice"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl relative">
            <button
              onClick={() => setViewItem(null)}
              className="absolute right-4 top-4 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Receipt className="text-primary" /> Invoice Preview
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User size={18} /> <strong>Student:</strong> {viewItem.userName}
              </div>

              <div className="flex items-center gap-2">
                <Building2 size={18} /> <strong>University:</strong>{" "}
                {viewItem.universityName}
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={18} /> <strong>Scholarship:</strong>{" "}
                {viewItem.scholarshipName}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={18} /> <strong>Paid On:</strong>{" "}
                {new Date(
                  viewItem.paymentInfo?.paidAt ||
                    viewItem.paymentDate ||
                    viewItem.applicationDate
                ).toLocaleString()}
              </div>

              <div className="flex items-center gap-2">
                <DollarSign size={18} /> <strong>Total Paid:</strong> $
                {viewItem.totalAmount}
              </div>
            </div>

            <button
              onClick={() => downloadInvoice(viewItem)}
              className="mt-5 bg-primary text-white px-4 py-2 rounded-lg w-full"
            >
              {downloading ? "Generating Invoice..." : "Download Invoice"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
