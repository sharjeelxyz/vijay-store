"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="relative">
      {!user ? (
        <Link
          href="/login"
          className="px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
        >
          Login
        </Link>
      ) : (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            <span className="text-sm font-medium ">
              👤 {user?.name?.split(" ")[0] || "User"}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute mt-2 w-35 bg-white shadow-md rounded-md p-2 z-50">
              {/* <Link
                href="/profile"
                className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                Profile
              </Link> */}
              <Link
                href="/orders"
                className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                Your Orders
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
