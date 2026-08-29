"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  Mail,
  Building,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface EnquiriesTableProps {
  initialSubmissions: ContactSubmission[];
}

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

const ITEMS_PER_PAGE = 12;

export default function EnquiriesTable({ initialSubmissions }: EnquiriesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search submissions
  const filteredSubmissions = useMemo(() => {
    return initialSubmissions.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;

      const matchesService =
        selectedService === "all" ||
        (item.service && item.service.toLowerCase() === selectedService.toLowerCase());

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [initialSubmissions, searchQuery, selectedStatus, selectedService]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSubmissions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSubmissions, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by client name, email, company or message..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-initial shrink-0">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full appearance-none bg-slate-950/90 border border-slate-800 rounded-xl pl-3 pr-8 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
            <Filter
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>

          {/* Service Filter */}
          <div className="relative flex-1 sm:flex-initial shrink-0">
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full appearance-none bg-slate-950/90 border border-slate-800 rounded-xl pl-3 pr-8 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Services</option>
              <option value="ai">AI Solutions</option>
              <option value="software">Software Development</option>
              <option value="cloud">Cloud Solutions</option>
              <option value="security">Cybersecurity</option>
              <option value="transformation">Digital Transformation</option>
              <option value="erp">ERP Solutions</option>
              <option value="consulting">IT Consulting</option>
              <option value="data">Data Analytics</option>
            </select>
            <Filter
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
        {paginatedItems.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Inbox size={44} className="mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold text-slate-300">No matching enquiries found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Client Name
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Contact Email
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Company
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Service Interest
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Date
                  </th>
                  <th scope="col" className="px-5 py-4 text-right font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedItems.map((item) => {
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
                      <td className="px-5 py-4 font-semibold text-white">
                        <span>{item.full_name}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        <a
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <Mail size={13} className="shrink-0 text-slate-500" />
                          <span>{item.email}</span>
                        </a>
                      </td>
                      <td className="px-5 py-4 text-slate-300 text-xs">
                        {item.company ? (
                          <div className="flex items-center gap-1.5">
                            <Building size={13} className="text-slate-500 shrink-0" />
                            <span>{item.company}</span>
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
                          {item.service || "General Inquiry"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-500" />
                          <span>{dateStr}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
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

        {/* Pagination bar */}
        {filteredSubmissions.length > 0 && (
          <div className="bg-slate-950/60 border-t border-slate-800 px-5 py-3.5 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Showing <span className="font-semibold text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
              <span className="font-semibold text-white">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredSubmissions.length)}
              </span>{" "}
              of <span className="font-semibold text-white">{filteredSubmissions.length}</span> enquiries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              <span className="text-xs text-slate-400 px-2">
                Page <span className="font-bold text-white">{currentPage}</span> of{" "}
                <span className="font-bold text-white">{totalPages}</span>
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
