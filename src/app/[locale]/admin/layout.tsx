import Link from "next/link";
import { LayoutDashboard, MessageSquare, Settings, Briefcase, FileText } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:block">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Dexber Admin</h2>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5 me-3" />
            Dashboard
          </Link>
          <Link href="/admin/inquiries" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 me-3" />
            Inquiries
            <span className="ms-auto bg-blue-600 text-white text-xs py-0.5 px-2 rounded-full">3</span>
          </Link>
          <Link href="/admin/requirements" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <FileText className="w-5 h-5 me-3" />
            Requirements
          </Link>
          <Link href="/admin/projects" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Briefcase className="w-5 h-5 me-3" />
            Projects
          </Link>
          <Link href="/admin/blog" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <FileText className="w-5 h-5 me-3" />
            Blog
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Settings className="w-5 h-5 me-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center px-6 md:hidden">
          <h2 className="text-xl font-bold text-white">Dexber Admin</h2>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
