import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // FIXED

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
    /* (UI Code is unchanged – keeping as-is) */
    /* Your full JSX stays the same */
    <div className="min-h-screen bg-black text-white relative">
      ...
    </div>
  );
}
