import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECOCO 智慧回收機申請設置",
  description: "ECOCO 智慧回收機設置申請、案例展示與後台管理",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
