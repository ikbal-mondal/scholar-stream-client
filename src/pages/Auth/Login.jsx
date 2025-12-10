import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";
import { Plane } from "lucide-react";

const Login = () => {
  const { login, signInWithGoogle, resetPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      Swal.fire("Welcome!", "Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      Swal.fire("Welcome!", "Logged in with Google", "success");
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleReset = async () => {
    if (!email) {
      return Swal.fire("Enter Email", "Please enter your email", "info");
    }
    try {
      await resetPassword(email);
      Swal.fire("Sent", "Password reset email sent!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      {/* MAIN CARD */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 pt-12 ">
        {/* PAGE TITLE */}

        <div className="mb-2 text-center">
          <h2 className="text-center text-3xl font-extrabold text-primary">
            LogIn Now
          </h2>
          <p className="text-center text-sm text-black mb-8 "></p>
          Welcome to
          <Link
            to="/"
            className="text-2xl justify-center font-extrabold flex items-center gap-1"
          >
            <span className="text-primary">Scholar</span>
            <span className="text-secondary">Stream</span>
          </Link>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              className="w-full border-b border-gray-300 focus:border-purple-600 focus:outline-none p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full border-b border-gray-300 focus:border-purple-600 focus:outline-none p-2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
              />
              Remember
            </label>

            <button
              type="button"
              onClick={handleReset}
              className="text-purple-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition">
            LOGIN
          </button>
        </form>
        {/* OR DIVIDER */}
        <div className="my-6 text-center text-gray-400 text-sm">OR</div>
        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogle}
          className="w-full py-2 cursor-pointer border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZEZ6fa7bPwCI4HE5583rhd3qiFNmf6kiPg&s"
            alt="google"
            className="w-12"
          />
          Continue with Google
        </button>
        {/* REGISTER LINK */}
        <p className="text-center text-sm mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline ml-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
