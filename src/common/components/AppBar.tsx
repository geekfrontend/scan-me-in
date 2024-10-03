"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ReactNode } from "react";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { HiOutlineCamera, HiOutlineHome, HiOutlineUser } from "react-icons/hi";

import Camera from "./Camera";

interface MenuProps {
  name: string;
  icon: ReactNode;
  path: string;
}

const iconSize: number = 18;

const MENU: MenuProps[] = [
  {
    name: "History",
    icon: <CalendarIcon size={iconSize} />,
    path: "/history",
  },
  {
    name: "Home",
    icon: <HiOutlineHome size={iconSize} />,
    path: "/",
  },
  {
    name: "Profile",
    icon: <HiOutlineUser size={iconSize} />,
    path: "/profile",
  },
];

const AppBar = () => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] mx-auto">
      {showModal && (
        <>
          <div
            id="modal"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
          >
            <div className="fixed inset-0 bg-black opacity-50" />

            <div className="relative w-full max-w-[480px] h-full">
              <div className="relative flex flex-col justify-center p-4 bg-white shadow dark:bg-gray-700 w-full h-full">
                <div className="h-96 w-96 mx-auto">
                  <Camera />
                </div>
                <div></div>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="relative cursor-pointer  opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-blue-700 to-blue-400 active:scale-95 rounded-[16px]"
                  >
                    <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-[14px]">
                      Tutup
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {pathname === "/" && (
        <div className="w-[80%] mx-auto mb-2">
          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-blue-700 to-blue-400 active:scale-95 rounded-[16px]"
            >
              <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-[14px]">
                <HiOutlineCamera size={iconSize} />
                Presence with camera
              </span>
            </button>
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
                }
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
