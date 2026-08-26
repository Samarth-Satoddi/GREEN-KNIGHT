import Link from "next/link";
import { verifyAdmin } from "@/lib/supabase/auth-check";
import { supabaseAdmin } from "@/lib/supabase/admin";
import EnquiriesTable from "@/components/admin/EnquiriesTable";
import { Inbox, ArrowLeft, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
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

  const { data: submissions, error } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Fetch Enquiries Error]:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Inbox className="text-emerald-400" size={28} />
            <span>Customer Enquiries</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search, filter, review, and manage all incoming enterprise client requests.
          </p>
        </div>
      </div>

      {/* Interactive Table Component */}
      <EnquiriesTable initialSubmissions={submissions || []} />
    </div>
  );
}
