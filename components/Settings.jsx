"use client";
import { useSession } from "next-auth/react";

const Settings = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-4 text-center">Please login to view settings.</p>;
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Account Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">Full Name:</div>
            <div className="font-medium">{session.user.fullname}</div>
            
            <div className="text-gray-600">Email:</div>
            <div className="font-medium">{session.user.email}</div>

            <div className="text-gray-600">Role:</div>
            <div className="font-medium uppercase">
              {session.user.isAdmin ? "Administrator" : session.user.isMod ? "Moderator" : "User"}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>
        </div>

        <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          Save Changes
        </button>
      </div>
    </main>
  );
};

export default Settings;
