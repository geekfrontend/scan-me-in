import React from "react";
import { HiLogout as CheckIcon } from "react-icons/hi";

import Hero from "@/common/components/Hero";

import CheckCard from "./CheckCard";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="p-6 -mt-8 pb-28 rounded-t-3xl min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="w-full p-5 border bg-white border-neutral-100 shadow-t-sm space-y-5 rounded-3xl cursor-pointer transition-all duration-300">
          <div className="flex gap-3 items-center mb-2">
            <h5 className="font-medium">Hello World</h5>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Today Attendance</h3>
        <div className="flex gap-4">
          <CheckCard
            title="Check In"
            icon={<CheckIcon size={30} />}
            time="10:00"
          />
          <CheckCard
            title="Check Out"
            icon={<CheckIcon size={30} />}
            time="18:00"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
