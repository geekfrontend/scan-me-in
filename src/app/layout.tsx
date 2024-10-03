import clsx from "clsx";
import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/provider/AuthProvider";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scan Me In",
  description: "by geekfrontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="<generated>" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={clsx("bg-neutral-100", sora.className)}>
        <div className="max-w-[480px] mx-auto bg-gradient-to-br from-pink-200 via-purple-100 to-indigo-100 md:shadow-md min-h-screen">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
