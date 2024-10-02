"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { HiOutlineCamera, HiOutlineHome } from "react-icons/hi";

interface MenuProps {
  name: string;
  icon: ReactNode;
  path: string;
}

const iconSize: number = 18;

const MENU: MenuProps[] = [
  {
    name: "Beranda",
    icon: <HiOutlineHome size={iconSize} />,
    path: "/",
  },
  {
    name: "History",
    icon: <CalendarIcon size={iconSize} />,
    path: "/history",
  },
];

const AppBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] mx-auto">
      {pathname === "/" && (
        <div className="w-[80%] mx-auto mb-2">
          <div className="flex justify-center">
            <button className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95">
              <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                <HiOutlineCamera size={iconSize} />
                Presensi dengan kamera
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-1 justify-center border-t border-t-purple-100 rounded-t-3xl py-3 px-0  shadow-lg text-neutral-600 bg-white">
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
