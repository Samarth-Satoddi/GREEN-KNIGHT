import Link from "next/link";
import { notFound } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/auth-check";
import { supabaseAdmin } from "@/lib/supabase/admin";
import EnquiryDetailManager from "@/components/admin/EnquiryDetailManager";
import { ArrowLeft, Inbox, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  const { id } = await params;

  // Fetch enquiry
  const { data: enquiry, error: enquiryError } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (enquiryError || !enquiry) {
    return notFound();
  }

  // Fetch audit logs
  const { data: auditLogs } = await supabaseAdmin
    .from("enquiry_audit_logs")
    .select("*")
    .eq("enquiry_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to All Enquiries</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enquiry: {enquiry.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Submitted on{" "}
            {new Date(enquiry.created_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Inbox size={14} />
            <span>Enquiries List</span>
          </Link>
        </div>
      </div>

      {/* Main Detail & Manager View */}
      <EnquiryDetailManager
        enquiry={enquiry}
        initialAuditLogs={auditLogs || []}
      />
    </div>
  );
}
