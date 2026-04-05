"use client";

export default function ProfilePage() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded-xl w-[300px]">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
}
