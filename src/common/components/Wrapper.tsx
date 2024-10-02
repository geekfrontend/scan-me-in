"use client";

import { usePathname } from "next/navigation";

import withAuth from "@/utils/withAuth";

import AppBar from "./AppBar";
import Toast from "./Toast";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <Toast />
      <main>{children}</main>
      {pathname === "/" || pathname === "/history" ? <AppBar /> : null}{" "}
    </>
  );
};

export default withAuth(Wrapper);
