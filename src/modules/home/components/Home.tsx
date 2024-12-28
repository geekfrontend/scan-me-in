"use client";

import React from "react";
import { HiLogout } from "react-icons/hi";

import Hero from "@/common/components/Hero";

import CheckCard from "./CheckCard";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="p-6 -mt-8 pb-28 rounded-t-3xl min-h-screen  bg-white">
        <div className="w-full p-5 border bg-white mb-2 border-neutral-100 shadow-t-sm rounded-3xl transition-all duration-300">
          <div className="flex gap-3 items-center">
            <h5 className="font-medium">PT. X</h5>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Today Attendance</h3>
        <div className="flex gap-4">
          <CheckCard
            title="Check In"
            icon={<HiLogout size={30} />}
            time="10:00"
          />
          <CheckCard
            title="Check Out"
            icon={<HiLogout size={30} />}
            time="18:00"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
