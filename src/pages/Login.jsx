import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput.jsx";

const BACKEND_URL = "http://localhost:5000"; // match backend

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password.trim()) {
      newErrors.password = "Your password must contain between 4 and 60 characters.";
    } else if (password.length < 4 || password.length > 60) {
      newErrors.password = "Password should be 4–60 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/login`, {
        email,
        password,
      });

      if (res.data?.success) {
        // In a real app you'd store token
        navigate("/dashboard", { state: { email } });
      } else {
        setServerError(res.data?.message || "Login failed.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Unable to login. Please check your credentials.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar with logo */}
        <header className="px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-tight">
            NETFLIX
          </div>
        </header>

        {/* Centered login card */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="bg-black/75 max-w-md w-full px-8 py-10 rounded-md">
            <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <TextInput
                label="Email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <TextInput
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              {serverError && (
                <div className="text-sm text-red-500 mb-3">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-medium py-3 rounded-sm text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 mt-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-red-600"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:underline">
                  Need help?
                </button>
              </div>

              <div className="mt-6 text-sm text-zinc-400">
                <span className="mr-1">New to Netflix?</span>
                <button type="button" className="text-white hover:underline">
                  Sign up now.
                </button>
                <p className="mt-3 text-xs text-zinc-500 leading-snug">
                  This page is a demo clone. Use:
                  <br />
                  <span className="font-mono">
                    user@netflixclone.com / password123
                  </span>
                </p>
              </div>
            </form>
          </div>
        </main>

        <footer className="border-t border-zinc-800 py-6 text-xs text-zinc-500 text-center">
          Netflix login clone demo · React + Node.js
        </footer>
      </div>
    </div>
  );
}
