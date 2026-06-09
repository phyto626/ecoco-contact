"use client";

import { signOut } from "next-auth/react";
import { LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import "./admin.css";

export function Header({ userName }: { userName: string }) {
  return (
    <header className="admin-header">
      <div>
        <strong>後台管理</strong>
        <span>管理申請進度、內容與案例</span>
      </div>
      <div className="admin-header__user">
        <UserCircle size={20} />
        <span>{userName}</span>
        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
          <LogOut size={16} />
          登出
        </Button>
      </div>
    </header>
  );
}
