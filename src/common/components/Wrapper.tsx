"use client";

import { usePathname } from "next/navigation";

import AppBar from "./AppBar";
import Toast from "./Toast";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <Toast />
      <main>{children}</main>
      {pathname === "/" ||
      pathname === "/history" ||
      pathname === "/profile" ? (
        <AppBar />
      ) : null}{" "}
    </>
  );
};

export default Wrapper;
