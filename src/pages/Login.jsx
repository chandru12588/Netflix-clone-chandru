import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Enter a valid email";
    if (!password.trim()) newErrors.password = "Password required";
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

      if (res.data.success) {
        navigate("/dashboard", { state: { email } });
      } else {
        setServerError(res.data.message);
      }
    } catch (err) {
      setServerError("Unable to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* Header with Netflix logo */}
      <header className="px-6 sm:px-10 py-4 flex items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-wide">
          NETFLIX
        </h1>
      </header>

      {/* Center login card */}
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="bg-black/80 p-10 rounded-md max-w-md w-full">

          <h2 className="text-3xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="Email"
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
              <p className="text-red-500 text-sm mb-2">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 w-full py-3 mt-3 rounded hover:bg-red-700"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
