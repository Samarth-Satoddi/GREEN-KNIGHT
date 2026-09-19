"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Trash2,
  Mail,
  AlertCircle,
  ExternalLink,
  Shield,
  ArrowRight,
  Bot,
  User,
} from "lucide-react";
import { ContactSubmission } from "./EnquiriesTable";

interface AuditLogItem {
  id: string;
  admin_user_id: string;
  admin_email: string | null;
  old_status: string | null;
  new_status: string;
  created_at: string;
}

interface EnquiryDetailManagerProps {
  enquiry: ContactSubmission;
  initialAuditLogs: AuditLogItem[];
}

const statusOptions = [
  { value: "new", label: "New", color: "text-amber-400 bg-amber-500/15 border-amber-500/30" },
  { value: "contacted", label: "Contacted", color: "text-sky-400 bg-sky-500/15 border-sky-500/30" },
  { value: "in_progress", label: "In Progress", color: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30" },
  { value: "converted", label: "Converted", color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
  { value: "closed", label: "Closed", color: "text-slate-400 bg-slate-700/30 border-slate-600/30" },
];

export default function EnquiryDetailManager({
  enquiry,
  initialAuditLogs,
}: EnquiryDetailManagerProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(enquiry.status);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus || updating) return;

    setUpdating(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setFeedback({
          type: "error",
          message: data.error || "Failed to update status.",
        });
        return;
      }

      setCurrentStatus(newStatus);
      setFeedback({
        type: "success",
        message: `Status successfully updated to ${newStatus.toUpperCase()}.`,
      });

      // Refetch latest details and audit logs
      const getRes = await fetch(`/api/admin/enquiries/${enquiry.id}`);
      if (getRes.ok) {
        const getData = await getRes.json();
        if (getData.auditLogs) {
          setAuditLogs(getData.auditLogs);
        }
      }

      router.refresh();
    } catch {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred while saving status.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the enquiry from "${enquiry.full_name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/enquiries");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete enquiry.");
        setDeleting(false);
      }
    } catch {
      alert("Error deleting enquiry.");
      setDeleting(false);
    }
  };

  const activeOption = statusOptions.find((o) => o.value === currentStatus) || statusOptions[0];

  return (
    <div className="space-y-8">
      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Grid: Left Details & Right Actions/Status */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Customer & Message Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
              <Shield size={18} className="text-emerald-400" />
              <span>Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Full Name
                </label>
                <div className="text-base font-semibold text-white">
                  {enquiry.full_name}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Email Address
                </label>
                <div className="text-base font-medium text-emerald-400 break-words">
                  <a
                    href={`mailto:${enquiry.email}?subject=Green%20Knights%20Follow-up`}
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <span className="truncate">{enquiry.email}</span>
                    <ExternalLink size={13} className="shrink-0 opacity-70" />
                  </a>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Company / Organization
                </label>
                <div className="text-sm font-medium text-slate-200">
                  {enquiry.company || "Not provided"}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Acquisition Source
                </label>
                <div>
                  {enquiry.source === "chatbot" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span>🤖</span>
                      <span>AI Chatbot Assistant</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      <span>📩</span>
                      <span>Contact Form Submission</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Requested Service
                </label>
                <div className="text-sm font-medium text-slate-200">
                  {enquiry.service ? (
                    <span className="inline-block bg-slate-800 px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 border border-slate-700">
                      {enquiry.service}
                    </span>
                  ) : (
                    <span className="text-slate-500">General Inquiry</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message / Project Details Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Project Details & Message
            </label>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
              {enquiry.message}
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href={`mailto:${enquiry.email}?subject=Regarding%20Your%20Inquiry%20with%20Green%20Knights&body=Hi%20${encodeURIComponent(
                  enquiry.full_name
                )},%0D%0A%0D%0AThank%20you%20for%20contacting%20Green%20Knights.%0D%0A%0D%0A`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors w-full sm:w-auto"
              >
                <Mail size={16} />
                <span>Reply to Client</span>
              </a>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50 w-full sm:w-auto"
              >
                <Trash2 size={15} />
                <span>{deleting ? "Deleting..." : "Delete Enquiry"}</span>
              </button>
            </div>
          </div>

          {/* Relevant Chatbot Conversation Card (If present) */}
          {enquiry.conversation && Array.isArray(enquiry.conversation) && enquiry.conversation.length > 0 && (
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Relevant Chatbot Conversation
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  {enquiry.conversation.length} Messages
                </span>
              </div>

              <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                {enquiry.conversation.map((msg, index) => {
                  const isBot = msg.role === "assistant";
                  return (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        isBot ? "items-start" : "items-start flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isBot
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {isBot ? <Bot size={14} /> : <User size={14} />}
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isBot
                            ? "bg-slate-950 border border-slate-800 text-slate-200"
                            : "bg-emerald-950/60 border border-emerald-800/40 text-emerald-100"
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          {isBot ? "Green Knight AI" : enquiry.full_name}
                        </div>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Status Updater & Audit History */}
        <div className="space-y-6">
          {/* Status Control Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Enquiry Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Current state:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${activeOption.color}`}
                >
                  {activeOption.label}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 block">Change Status:</label>
                <div className="grid grid-cols-1 gap-2">
                  {statusOptions.map((opt) => {
                    const isSelected = opt.value === currentStatus;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleStatusChange(opt.value)}
                        disabled={updating || isSelected}
                        className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-between border transition-all ${
                          isSelected
                            ? `${opt.color} ring-1 ring-emerald-500/40 cursor-default`
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer"
                        } disabled:cursor-not-allowed`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <CheckCircle size={14} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {updating && (
                <p className="text-xs text-emerald-400 text-center animate-pulse pt-2">
                  Updating status and recording audit log...
                </p>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-500 space-y-1.5">
              <div>
                <span className="text-slate-400 font-medium">Submitted:</span>{" "}
                {new Date(enquiry.created_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
              <div>
                <span className="text-slate-400 font-medium">Last Updated:</span>{" "}
                {new Date(enquiry.updated_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>
          </div>

          {/* Audit Log Timeline Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <span>Status History</span>
            </h3>

            {auditLogs.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                No status modifications recorded yet.
              </div>
            ) : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {auditLogs.map((log) => {
                  const logDate = new Date(log.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div key={log.id} className="relative group text-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[23px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-900" />

                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-slate-200">
                          {log.old_status && (
                            <>
                              <span className="uppercase text-slate-400">
                                {log.old_status}
                              </span>
                              <ArrowRight size={11} className="text-slate-500" />
                            </>
                          )}
                          <span className="uppercase text-emerald-400">
                            {log.new_status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {logDate}
                        </div>
                        {log.admin_email && (
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            by {log.admin_email}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
