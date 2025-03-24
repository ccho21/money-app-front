"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomTabBar from "@/components/ui/BottomTabBar";
import AuthGuard from "@/components/auth/AuthGuard";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { fetchMe } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const initUser = async () => {
      try {
        const user = await fetchMe<{ id: string; email: string }>();
        setUser(user);
      } catch (error) {
        console.log("자동 로그인 실패");
      }
    };

    initUser();
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthGuard>{children}</AuthGuard>
        <BottomTabBar />
      </body>
    </html>
  );
}
