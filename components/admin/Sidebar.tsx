import Link from "next/link";
import { FilePenLine, LayoutDashboard, ListChecks } from "lucide-react";
import "./admin.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="sidebar__brand" href="/dashboard">
        <img src="/images/logo.png" alt="ECOCO Logo" style={{ height: "28px", width: "auto" }} />
      </Link>
      <nav className="sidebar__nav">
        <Link href="/dashboard">
          <LayoutDashboard size={18} />
          儀表板
        </Link>
        <Link href="/leads">
          <ListChecks size={18} />
          客戶名單
        </Link>
        <Link href="/editor">
          <FilePenLine size={18} />
          前台內容
        </Link>
      </nav>
      <Link className="sidebar__site" href="/">
        查看前台
      </Link>
    </aside>
  );
}
