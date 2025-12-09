# 🎓 Scholar Stream – Frontend (React + Tailwind CSS)

The frontend interface for **Scholar Stream**, a complete scholarship management and student application system built with React, Tailwind CSS, Firebase Authentication, Stripe Payments, and a powerful Node.js backend.

The frontend provides **role-based dashboards**, **real-time scholarship browsing**, **secure payments**, **moderation tools**, and **admin-level analytics**.

---

## 🚀 Live Features Overview

### 👨‍🎓 Student Features

- 🔐 **Login / Register** via Firebase + Backend JWT
- 🏠 Personalized **Student Dashboard**
- 🎓 Browse scholarships with:
  - Search & filter
  - Country/category/degree filters
- 📝 Submit scholarship applications
- 💾 Auto-save application records before payment
- 💳 Secure payment using **Stripe Checkout**
- 📄 Download invoices & application PDFs
- 📊 Track application statuses (Pending, Processing, Approved, Completed, Rejected)
- ⭐ Add, edit, delete reviews
- 💬 See feedback from moderators

---

### 🧑‍💼 Moderator Features

- 📁 Access to all student applications
- 🔍 View detailed form data
- ✔ Approve / Reject / Complete applications
- ✏ Add feedback for students
- 🚫 Manage inappropriate reviews
- 🔐 Role-based restricted access

---

### 🛠 Admin Features

- 👥 **User Management**
  - Promote/Demote roles (Student → Moderator → Admin)
  - Delete users (auto removes their applications & reviews)
- 🎓 **Scholarships Management**
  - Create, Edit, Delete scholarships
- 📝 **Application Management**
  - View all applications from all users
- ⭐ **Reviews Management**
- 📊 **Analytics Dashboard**
  - Total Users
  - Total Scholarships
  - Total Applications
  - Paid Applications
  - University/category charts

---

## 🧾 Full Feature List (Frontend)

### 🔐 Authentication

- Firebase Email/Password login
- Google login (optional)
- Backend JWT issued after Firebase login
- Route protection for each role:
  - Student
  - Moderator
  - Admin

---

### 🎓 Scholarships Module

- Full scholarship listing page
- Advanced filters:
  - Category / Country / Degree / Subject
- Sort by latest / oldest
- Detail page with:
  - Description
  - Eligibility
  - Tuition fees
  - Coverage
  - University info
- Recent scholarships section

---

### 📝 Applications Module

- Dynamic form UI
- Auto-store application record before payment
- Stripe payment flow fully integrated
- Status tracking UI
- Student view of all past applications
- Moderator/Admin full control interface
- Feedback modal for moderators

---

### ⭐ Reviews Module

- Add review popup
- Edit & delete own reviews
- Scholarship-specific review list
- Moderator/Admin review removal

---

### 💳 Payment System (Stripe)

- Stripe Checkout Session
- Stripe PaymentIntent (optional)
- Webhook-based verification
- Payment success screen
- Invoice PDF generation

---

## 🛠 Technology Stack (Frontend)

| Technology        | Purpose                                 |
| ----------------- | --------------------------------------- |
| **React.js**      | Component-based UI                      |
| **React Router**  | Routing/navigation                      |
| **Tailwind CSS**  | Styling framework                       |
| **Axios**         | API communication                       |
| **Firebase Auth** | Login/Identity                          |
| **JWT**           | Secure user access                      |
| **Stripe.js**     | Online payments                         |
| **SweetAlert2**   | Notifications                           |
| **Lucide-react**  | Modern icons                            |
| **PDFMake**       | PDF generation (invoice & applications) |

---

## 📁 Project Folder Structure

---

## 🔒 Security Highlights

- Client-side route protection using:
  - PrivateRoute
  - RoleProtectedRoute
- JWT stored securely (HTTP-only)
- API request authorization headers
- Validation before performing actions

---
