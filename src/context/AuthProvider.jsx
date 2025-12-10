// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import Swal from "sweetalert2";
import api from "../services/api";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [fbUser, setFbUser] = useState(null); // Firebase user
  const [backendUser, setBackendUser] = useState(null); // Backend user (with role)
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------------
       EXCHANGE FIREBASE TOKEN WITH BACKEND
  ------------------------------------------------------------------ */
  const exchangeWithBackend = async (idToken) => {
    try {
      const res = await api.post("/auth/firebase-login", { idToken });
      const { token, user } = res.data;

      localStorage.setItem("APP_JWT", token);
      setBackendUser(user);
      return { token, user };
    } catch (err) {
      console.error("Backend exchange failed", err);
      return null;
    }
  };

  /* ------------------------------------------------------------------
      🔥 REGISTER USER WITH FIREBASE + EMAIL VERIFICATION
  ------------------------------------------------------------------ */
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      Swal.fire(
        "Registered!",
        "We sent a verification email. Please verify before login.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Registration failed", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------
      🔥 LOGIN (THIS FIXES YOUR PROBLEM — ALWAYS SEND idToken)
  ------------------------------------------------------------------ */
  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const idToken = await user.getIdToken(true);

    const res = await api.post("/auth/firebase-login", { idToken });

    setBackendUser(res.data.user);
    localStorage.setItem("APP_JWT", res.data.token);

    return user;
  };
  // update user data
  const setBackendUserSafe = (user) => {
    setBackendUser(user);
    localStorage.setItem("backendUser", JSON.stringify(user));
  };

  /* ------------------------------------------------------------------
      🔥 GOOGLE LOGIN
  ------------------------------------------------------------------ */
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const idToken = await user.getIdToken(true);

      const exchanged = await exchangeWithBackend(idToken);
      setFbUser(user);

      return exchanged;
    } catch (err) {
      Swal.fire("Google Login Failed", err.message, "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------
      🔥 LOGOUT
  ------------------------------------------------------------------ */
  const logout = async () => {
    setLoading(true);
    try {
      await fbSignOut(auth);
      setFbUser(null);
      setBackendUser(null);
      localStorage.removeItem("APP_JWT");
    } catch (err) {
      Swal.fire("Logout Failed", "Please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------
      🔥 RESET PASSWORD
  ------------------------------------------------------------------ */
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("Sent!", "Password reset email sent.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  /* ------------------------------------------------------------------
      🔥 AUTH STATE LISTENER — FIXES DASHBOARD NULL BUG
  ------------------------------------------------------------------ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setFbUser(user);

        try {
          const idToken = await user.getIdToken(true);
          await exchangeWithBackend(idToken); // ensures backendUser loads on refresh
        } catch (err) {
          console.log("Token refresh failed", err);
        }
      } else {
        setFbUser(null);
        setBackendUser(null);
        localStorage.removeItem("APP_JWT");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ------------------------------------------------------------------
      🔥 PROVIDER VALUE
  ------------------------------------------------------------------ */
  const value = {
    fbUser,
    backendUser,
    loading,
    register,
    login,
    signInWithGoogle,
    logout,
    resetPassword,
    setBackendUserSafe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
