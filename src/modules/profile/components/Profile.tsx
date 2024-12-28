"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";

import { auth } from "@/configs/firebase";

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      console.log("User signed out");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <PageHeader title="Profile" />
      <PageWrapper>
        <div className="space-y-2">
          <label
            htmlFor="profile-full-name"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
          >
            Full Name
          </label>
          <input
            id="profile-full-name"
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter full name"
          />
          <label
            htmlFor="profile-username"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
          >
            Username
          </label>
          <input
            id="profile-username"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter username"
          />
          <label
            htmlFor="profile-email"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
          >
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter email"
          />
        </div>

        <div className="mt-4 ">
          <button
            className="py-3 w-full px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </PageWrapper>
    </>
  );
};

export default Profile;
