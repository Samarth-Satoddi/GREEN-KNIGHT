import Link from "next/link";
import { verifyAdmin } from "@/lib/supabase/auth-check";
import { Shield, LayoutDashboard, Inbox, ExternalLink } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifyAdmin();

  // If the admin user is not verified in admin_users whitelist
  // Note: /admin/login handles its own view when unauthenticated
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {admin && (
        <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Brand / Title */}
              <div className="flex items-center gap-8">
                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 font-extrabold text-lg text-white hover:text-emerald-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-700/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Shield size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="leading-none text-[15px] font-bold text-white tracking-wide">
                      GREEN KNIGHTS
                    </span>
                    <span className="text-[11px] font-medium text-emerald-400 tracking-wider uppercase">
                      Admin Portal
                    </span>
                  </div>
                </Link>

                {/* Navigation tabs */}
                <nav className="hidden md:flex items-center gap-1">
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/enquiries"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Inbox size={16} />
                    Enquiries
                  </Link>
                </nav>
              </div>

              {/* Right: User profile, public site link & Logout */}
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded-md hover:bg-slate-800/60"
                  title="Open public company website in new tab"
                >
                  <ExternalLink size={14} />
                  Live Website
                </Link>

                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-medium text-slate-300">{admin.email}</span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                    {admin.role}
                  </span>
                </div>

                <AdminLogoutButton />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main content body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Green Knights of Tech & AI &bull; Sovereign Enterprise Security System
      </footer>
    </div>
  );
}
