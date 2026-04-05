"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    if (form.password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    if (!isLogin) {
      if (!form.name) return alert("Name required");
      if (!form.phone) return alert("Phone required");
      if (!form.address) return alert("Address required");
    }

    // Save user (important fields only)
    const userData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin ? "Login to continue" : "Sign up to start shopping"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border rounded-lg p-3"
                onChange={handleChange}
              />

              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                className="border rounded-lg p-3"
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                className="border rounded-lg p-3"
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border rounded-lg p-3"
            onChange={handleChange}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black text-white py-3 rounded-lg"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-black font-medium cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
