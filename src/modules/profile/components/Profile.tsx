"use client";

import { signOut, updateEmail, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Camera from "@/common/components/Camera";
import CameraHeader from "@/common/components/CameraHeader";
import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";

import { auth } from "@/configs/firebase";

const Profile = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    photoURL: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserData({
        fullName: currentUser.displayName || "",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "",
      });
    }
  }, []);

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

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: userData.fullName,
          photoURL: userData.photoURL,
        });
        await updateEmail(currentUser, userData.email);
        console.log("Profile updated successfully");
        toast.success("Profile updated successfully");
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoUpload = () => {
    setShowModal(true);
  };

  const changeProfile = async (newPhotoURL: string) => {
    setShowModal(false); // Tutup modal kamera
    setUserData((prev) => ({ ...prev, photoURL: newPhotoURL }));

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { photoURL: newPhotoURL });
        toast.success("Photo updated successfully");
      }
    } catch (error) {
      console.error("Error updating photo:", error);
      toast.error("Failed to update photo");
    }
  };

  return (
    <>
      {showModal && (
        <div
          id="modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
        >
          <div className="fixed inset-0 bg-black opacity-50" />

          <div className="relative w-full max-w-[480px] h-full bg-white">
            <CameraHeader
              handleBack={() => setShowModal(false)}
              isBackButton
              title="Presence with camera"
            />
            <div className="relative flex flex-col justify-center p-4 w-full">
              <Camera
                handleBack={() => setShowModal(false)}
                changeProfile={changeProfile} // Pasang fungsi ini
              />
            </div>
          </div>
        </div>
      )}
      <PageHeader title="Profile" />
      <PageWrapper>
        <div className="space-y-2">
          <div className="w-24 relative mx-auto">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={
                  userData.photoURL ||
                  "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
                alt="Profile Picture"
              />
              <div className="w-24 h-24 group hover:bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500 absolute">
                <img
                  className="hidden group-hover:block w-12"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt="Upload Icon"
                  onClick={handlePhotoUpload}
                />
              </div>
            </div>
          </div>

          <label htmlFor="profile-full-name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="profile-full-name"
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            className="py-2 px-3 block w-full border rounded-lg"
            placeholder="Enter full name"
          />

          <label htmlFor="profile-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="py-2 px-3 block w-full border rounded-lg"
            placeholder="Enter email"
          />
        </div>

        <div className="mt-4 space-y-2">
          <button
            className="py-3 w-full text-sm font-medium rounded-lg bg-blue-500 text-white"
            onClick={handleUpdateProfile}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>

          <button
            className="py-3 w-full text-sm font-medium rounded-lg bg-red-500 text-white"
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
