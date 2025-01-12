"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineCamera, HiOutlineHome, HiOutlineUser } from "react-icons/hi";

import { supabase } from "@/utils/supabase";

import Camera from "./Camera";
import CameraHeader from "./CameraHeader";

interface MenuProps {
  name: string;
  icon: ReactNode;
  path: string;
}

const iconSize: number = 18;

const MENU: MenuProps[] = [
  {
    name: "Riwayat",
    icon: <CalendarIcon size={iconSize} />,
    path: "/history",
  },
  {
    name: "Beranda",
    icon: <HiOutlineHome size={iconSize} />,
    path: "/",
  },
  {
    name: "Profil",
    icon: <HiOutlineUser size={iconSize} />,
    path: "/profile",
  },
];

const AppBar = () => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [isPresencedMorning, setIsPresencedMorning] = useState(true);
  const [isTodayPresenced, setIsTodayPresenced] = useState(false);

  const fetchTodayHistory = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      console.log(today);
      const { data, error } = await supabase
        .from("histories")
        .select("*")
        .eq("date", today);

      if (error) {
        throw error;
      }

      console.log("Fetched today's data:", data);
      if (data.length > 0) {
        if (data[0].check_in_time && !data[0].check_out_time) {
          setIsPresencedMorning(true);
        } else if (data[0].check_in_time && data[0].check_out_time) {
          setIsPresencedMorning(false);
          setIsTodayPresenced(true);
        }
      } else {
        setIsPresencedMorning(false);
        setIsTodayPresenced(false);
      }
    } catch (error) {
      console.error("Error fetching today's items:", error);
    } finally {
      console.log("Fetched today's data:");
    }
  };

  useEffect(() => {
    fetchTodayHistory();
  }, []);

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] mx-auto">
      {showModal && (
        <>
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
              <div className="relative flex flex-col justify-center p-4  dark:bg-gray-700 w-full">
                <Camera
                  handleBack={() => setShowModal(false)}
                  check={isPresencedMorning ? "OUT" : "IN"}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {pathname === "/" && (
        <div className="w-[80%] mx-auto mb-2">
          <div className="flex justify-center">
            {isTodayPresenced ? (
              <>
                <div className="relative opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-green-700 to-green-400 active:scale-95 rounded-[16px]">
                  <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-green}-500 text-white rounded-[14px]">
                    <FiCheckCircle size={iconSize} />
                    Sudah hadir
                  </span>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className={`relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-${isPresencedMorning ? "red" : "blue"}-700 to-${isPresencedMorning ? "red" : "blue"}-400 active:scale-95 rounded-[16px]`}
                >
                  <span
                    className={`w-full h-full flex items-center gap-2 px-8 py-3 bg-${isPresencedMorning ? "red" : "blue"}-500 text-white rounded-[14px]`}
                  >
                    <HiOutlineCamera size={iconSize} />
                    Presensi dengan kamera
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-1 justify-center border-t border-t-purple-100 rounded-t-3xl py-3 px-0 shadow-lg text-neutral-600 bg-white">
        {MENU.map((menu) => (
          <Link href={menu?.path} key={menu?.name}>
            <button
              className={clsx(
                "py-3 px-5 flex items-center cursor-pointer gap-2 rounded-full ",
                "hover:text-neutral-700",
                {
                  "bg-neutral-100 text-neutral-800 ": pathname === menu?.path,
                },
              )}
            >
              <div>{menu?.icon}</div>
              <div className="text-sm font-medium">{menu?.name}</div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBar;
