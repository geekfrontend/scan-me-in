"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/configs/firebase";

const Profile = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
