import Link from "next/link";
import { FilePenLine, LayoutDashboard, ListChecks, Recycle } from "lucide-react";
import "./admin.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="sidebar__brand" href="/dashboard">
        <Recycle size={28} />
        <span>ECOCO Admin</span>
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
