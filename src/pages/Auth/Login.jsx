import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";

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
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Login to Scholar Stream
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <button className="btn bg-primary text-white">Login</button>

          <button
            type="button"
            onClick={handleReset}
            className="text-primary underline"
          >
            Forgot?
          </button>
        </div>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogle}
        className="w-full px-4 py-2 border rounded flex items-center justify-center gap-2"
      >
        <img src="/google-icon.svg" alt="google" className="w-5" />
        Continue with Google
      </button>

      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
