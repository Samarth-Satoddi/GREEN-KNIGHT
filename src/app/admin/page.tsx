import Link from "next/link";
import { verifyAdmin } from "@/lib/supabase/auth-check";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  Inbox,
  Clock,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await verifyAdmin();

  if (!admin) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center">
        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <XCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-sm text-slate-400 mb-6">
          Your account is not registered as an authorized administrator. Please sign in with an authorized admin account.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
        >
          Return to Admin Login
        </Link>
      </div>
    );
  }

  // Fetch counts grouped by status
  const { data: allSubmissions } = await supabaseAdmin
    .from("contact_submissions")
    .select("id, full_name, email, company, service, status, created_at")
    .order("created_at", { ascending: false });

  const submissions = allSubmissions || [];

  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === "new").length;
  const contactedCount = submissions.filter((s) => s.status === "contacted").length;
  const inProgressCount = submissions.filter((s) => s.status === "in_progress").length;
  const convertedCount = submissions.filter((s) => s.status === "converted").length;
  const closedCount = submissions.filter((s) => s.status === "closed").length;

  const recentEnquiries = submissions.slice(0, 6);

  const statusConfig: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    new: {
      label: "NEW",
      bg: "bg-amber-500/15",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    contacted: {
      label: "CONTACTED",
      bg: "bg-sky-500/15",
      text: "text-sky-400",
      border: "border-sky-500/30",
    },
    in_progress: {
      label: "IN PROGRESS",
      bg: "bg-indigo-500/15",
      text: "text-indigo-400",
      border: "border-indigo-500/30",
    },
    converted: {
      label: "CONVERTED",
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    closed: {
      label: "CLOSED",
      bg: "bg-slate-700/30",
      text: "text-slate-400",
      border: "border-slate-600/30",
    },
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <ShieldCheck size={16} />
            <span>Sovereign Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enquiries & Operations Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time pipeline monitoring and customer acquisition overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 transition-colors"
          >
            <Inbox size={16} />
            View All Enquiries
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
            <Inbox size={18} className="text-slate-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {totalCount}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">All Submissions</p>
          </div>
        </div>

        {/* New */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} />
              New
            </span>
            <Clock size={18} className="text-amber-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {newCount}
            </span>
            <p className="text-[11px] text-amber-300/70 mt-0.5">Pending Action</p>
          </div>
        </div>

        {/* Contacted */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-sky-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Contacted</span>
            <MessageSquare size={18} className="text-sky-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {contactedCount}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">Initial Outreach</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
            <Clock size={18} className="text-indigo-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {inProgressCount}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">Under Discussion</p>
          </div>
        </div>

        {/* Converted */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Converted</span>
            <TrendingUp size={18} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {convertedCount}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">Clients Won</p>
          </div>
        </div>

        {/* Closed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Closed</span>
            <CheckCircle2 size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-400">
              {closedCount}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">Archived</p>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Recent Enquiries</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest incoming submissions from prospective clients.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View all ({totalCount})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Inbox size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No enquiries recorded yet.</p>
            <p className="text-xs text-slate-600 mt-1">
              Submissions through the public contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-4 py-3.5 rounded-l-xl font-bold">
                    Client Name
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Company
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Service Interest
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3.5 rounded-r-xl text-right font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentEnquiries.map((item) => {
                  const cfg = statusConfig[item.status] || statusConfig.new;
                  const dateStr = new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-4 py-4 font-semibold text-white">
                        <div className="flex flex-col">
                          <span>{item.full_name}</span>
                          <span className="text-xs font-normal text-slate-500">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        {item.company ? (
                          <div className="flex items-center gap-1.5">
                            <Building size={14} className="text-slate-500 shrink-0" />
                            <span>{item.company}</span>
                          </div>
                        ) : (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
                          {item.service || "General Inquiry"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-500" />
                          <span>{dateStr}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/enquiries/${item.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>Review</span>
                          <ArrowRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
