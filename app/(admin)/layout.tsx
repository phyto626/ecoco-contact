import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/admin/Header";
import { Sidebar } from "@/components/admin/Sidebar";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="admin-shell">
      <Sidebar />
      <div>
        <Header userName={session.user?.name ?? "Admin"} />
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
