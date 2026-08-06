import { createFileRoute } from "@tanstack/react-router";

import { useCallback, useEffect, useState } from "react";

import { Loader2, Search, Download, FileText, History } from "lucide-react";

import { toast } from "sonner";

import { InquiryStatusBadge } from "@/components/admin/InquiryStatusBadge";

import {

  fetchInquiries,

  INQUIRY_STATUS_LABELS,

  updateInquiryStatus,

  type InquiryFilters,

} from "@/lib/admin-api";

import type { Inquiry, InquiryStatus } from "@/lib/db-types";

import { downloadCsv, downloadInquiriesPdf, inquiriesToCsv } from "@/lib/inquiry-export";

import {

  dedupeInquiryRowsForAdmin,

  formatInquiryRef,

  groupInquiriesByCustomer,

  parseBookingHistory,

} from "@/lib/inquiry-dedupe";

import { SERVICES } from "@/lib/site-data";



export const Route = createFileRoute("/admin/inquiries")({

  head: () => ({

    meta: [{ title: "Inquiries | YatraNexus Admin" }],

  }),

  component: AdminInquiriesPage,

});



const STATUS_OPTIONS: (InquiryStatus | "all")[] = [

  "all",

  "new",

  "contacted",

  "quoted",

  "closed",

  "spam",

];



function BookingHistoryList({ row }: { row: Inquiry }) {

  const history = parseBookingHistory(row.booking_history);

  if (history.length === 0) return null;



  return (

    <div className="mt-4">

      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">

        <History className="h-3.5 w-3.5" />

        Previous package requests

      </p>

      <ul className="mt-2 space-y-2">

        {history.map((entry, index) => (

          <li

            key={`${entry.saved_at ?? index}-${entry.package_name ?? index}`}

            className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"

          >

            <div className="font-medium">{entry.package_name || "General inquiry"}</div>

            <div className="text-xs text-muted-foreground">

              {[entry.destination, entry.service_type].filter(Boolean).join(" · ")}

              {entry.saved_at

                ? ` · ${new Date(entry.saved_at).toLocaleString("en-IN")}`

                : ""}

            </div>

            {entry.message && (

              <p className="mt-1 text-xs text-muted-foreground">{entry.message}</p>

            )}

          </li>

        ))}

      </ul>

    </div>

  );

}



function AdminInquiriesPage() {

  const [rows, setRows] = useState<Inquiry[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");

  const [filters, setFilters] = useState<InquiryFilters>({

    status: "new",

    service: "all",

    search: "",

    dateFrom: "",

    dateTo: "",

  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});



  const { rows: dedupedRows, hiddenCount } = dedupeInquiryRowsForAdmin(rows);

  const customerGroups = groupInquiriesByCustomer(dedupedRows);



  const load = useCallback(async () => {

    setLoading(true);

    try {

      const data = await fetchInquiries(filters);

      setRows(data);

    } catch (err) {

      toast.error(err instanceof Error ? err.message : "Could not load inquiries");

    } finally {

      setLoading(false);

    }

  }, [filters]);



  useEffect(() => {

    load();

  }, [load]);



  function applySearch() {

    setFilters((f) => ({ ...f, search: searchInput.trim() }));

  }



  async function handleStatusChange(id: string, status: InquiryStatus) {

    setUpdatingId(id);

    try {

      const notes = notesDraft[id];

      await updateInquiryStatus(id, status, notes);

      setRows((prev) =>

        prev.map((r) =>

          r.id === id ? { ...r, status, admin_notes: notes ?? r.admin_notes } : r,

        ),

      );

      toast.success("Status updated");

    } catch (err) {

      toast.error(err instanceof Error ? err.message : "Could not update status");

    } finally {

      setUpdatingId(null);

    }

  }



  async function saveNotes(id: string) {

    const row = rows.find((r) => r.id === id);

    if (!row) return;

    setUpdatingId(id);

    try {

      await updateInquiryStatus(id, row.status ?? "new", notesDraft[id] ?? "");

      setRows((prev) =>

        prev.map((r) => (r.id === id ? { ...r, admin_notes: notesDraft[id] ?? "" } : r)),

      );

      toast.success("Notes saved");

    } catch (err) {

      toast.error(err instanceof Error ? err.message : "Could not save notes");

    } finally {

      setUpdatingId(null);

    }

  }



  const exportRows = customerGroups.map((g) => g.primary);



  return (

    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>

          <h1 className="font-display text-3xl font-bold">Inquiries</h1>

          <p className="mt-1 text-sm text-muted-foreground">

            One page per customer — repeat bookings update the same inquiry ID when the lead is

            still active.

            {hiddenCount > 0 && (

              <span className="mt-1 block text-xs">

                {hiddenCount} accidental duplicate submission{hiddenCount === 1 ? "" : "s"}{" "}

                hidden.

              </span>

            )}

          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          <button

            type="button"

            disabled={exportRows.length === 0}

            onClick={() =>

              downloadCsv(

                `yatranexus-inquiries-${new Date().toISOString().slice(0, 10)}.csv`,

                inquiriesToCsv(exportRows),

              )

            }

            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"

          >

            <Download className="h-4 w-4" /> Export CSV

          </button>

          <button

            type="button"

            disabled={exportRows.length === 0}

            onClick={() => downloadInquiriesPdf(exportRows)}

            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"

          >

            <FileText className="h-4 w-4" /> Export PDF

          </button>

        </div>

      </div>



      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">

        <div className="relative min-w-[200px] flex-1">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input

            type="search"

            placeholder="Search name, phone, inquiry ID, destination…"

            value={searchInput}

            onChange={(e) => setSearchInput(e.target.value)}

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                e.preventDefault();

                applySearch();

              }

            }}

            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"

          />

        </div>

        <button

          type="button"

          onClick={applySearch}

          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft"

        >

          <Search className="h-4 w-4" />

          Search

        </button>

        <select

          value={filters.status ?? "all"}

          onChange={(e) =>

            setFilters((f) => ({

              ...f,

              status: e.target.value as InquiryStatus | "all",

            }))

          }

          className="rounded-md border border-input bg-background px-3 py-2 text-sm"

        >

          {STATUS_OPTIONS.map((s) => (

            <option key={s} value={s}>

              {s === "all" ? "All statuses" : INQUIRY_STATUS_LABELS[s]}

            </option>

          ))}

        </select>

        <select

          value={filters.service ?? "all"}

          onChange={(e) => setFilters((f) => ({ ...f, service: e.target.value }))}

          className="rounded-md border border-input bg-background px-3 py-2 text-sm"

        >

          <option value="all">All services</option>

          <option value="general">General</option>

          {SERVICES.map((s) => (

            <option key={s.slug} value={s.slug}>

              {s.title}

            </option>

          ))}

        </select>

        <input

          type="date"

          value={filters.dateFrom ?? ""}

          onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}

          className="rounded-md border border-input bg-background px-3 py-2 text-sm"

          title="From date"

        />

        <input

          type="date"

          value={filters.dateTo ?? ""}

          onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}

          className="rounded-md border border-input bg-background px-3 py-2 text-sm"

          title="To date"

        />

      </div>



      {!loading && (

        <p className="text-sm text-muted-foreground">

          Showing {customerGroups.length} customer{customerGroups.length === 1 ? "" : "s"}

          {filters.status === "new"

            ? " with pending inquiries"

            : filters.status === "all"

              ? ""

              : ` · ${INQUIRY_STATUS_LABELS[filters.status as InquiryStatus]}`}

          {filters.search ? ` matching “${filters.search}”` : ""}

        </p>

      )}



      {loading ? (

        <div className="flex justify-center py-16">

          <Loader2 className="h-8 w-8 animate-spin text-primary" />

        </div>

      ) : customerGroups.length === 0 ? (

        <div className="rounded-2xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">

          No inquiries match your filters.

        </div>

      ) : (

        <div className="space-y-3">

          {customerGroups.map(({ primary: row, related, bookingCount }) => {

            const expanded = expandedId === row.id;

            const status = row.status ?? "new";

            const inquiryRef = formatInquiryRef(row.id);

            return (

              <article

                key={row.id}

                className="rounded-2xl border border-border bg-card shadow-soft"

              >

                <button

                  type="button"

                  onClick={() => {

                    setExpandedId(expanded ? null : row.id);

                    if (!expanded) {

                      setNotesDraft((prev) => ({

                        ...prev,

                        [row.id]: row.admin_notes ?? "",

                      }));

                    }

                  }}

                  className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left"

                >

                  <div className="min-w-[160px] flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="font-semibold">{row.name}</span>

                      <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">

                        {inquiryRef}

                      </span>

                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-200">

                      <History className="h-3.5 w-3.5 shrink-0" />

                      This customer inquired {bookingCount} time{bookingCount === 1 ? "" : "s"}

                    </div>

                    <div className="text-xs text-muted-foreground">

                      {row.phone}

                      {row.email ? ` · ${row.email}` : ""}

                    </div>

                    {row.package_name && (

                      <div className="mt-0.5 text-xs font-medium text-foreground/80">

                        {row.package_name}

                      </div>

                    )}

                  </div>

                  <div className="text-sm capitalize text-muted-foreground">{row.service_type}</div>

                  <InquiryStatusBadge status={status} />

                  <div className="text-xs text-muted-foreground">

                    <div>Updated {new Date(row.updated_at).toLocaleString("en-IN")}</div>

                    <div className="opacity-70">

                      Created {new Date(row.created_at).toLocaleString("en-IN")}

                    </div>

                  </div>

                </button>



                {expanded && (

                  <div className="border-t border-border px-5 py-4 text-sm">

                    {bookingCount > 1 && (

                      <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">

                        <History className="h-4 w-4 shrink-0" />

                        Repeat customer — {bookingCount} total inquiries from this phone number.

                      </div>

                    )}

                    <dl className="grid gap-3 sm:grid-cols-2">

                      <dt className="text-muted-foreground">Inquiry ID</dt>

                      <dd className="font-mono text-xs">{row.id}</dd>

                      {row.subject && (

                        <>

                          <dt className="text-muted-foreground">Subject</dt>

                          <dd>{row.subject}</dd>

                        </>

                      )}

                      {row.package_name && (

                        <>

                          <dt className="text-muted-foreground">Current package</dt>

                          <dd>{row.package_name}</dd>

                        </>

                      )}

                      {row.destination && (

                        <>

                          <dt className="text-muted-foreground">Destination</dt>

                          <dd>{row.destination}</dd>

                        </>

                      )}

                      {row.travel_date && (

                        <>

                          <dt className="text-muted-foreground">Travel date</dt>

                          <dd>{row.travel_date}</dd>

                        </>

                      )}

                      {row.travelers != null && (

                        <>

                          <dt className="text-muted-foreground">Travelers</dt>

                          <dd>{row.travelers}</dd>

                        </>

                      )}

                    </dl>

                    {row.message && (

                      <p className="mt-4 rounded-lg bg-muted/40 p-3 text-muted-foreground">

                        {row.message}

                      </p>

                    )}

                    <BookingHistoryList row={row} />

                    {(row.selected_inclusions?.length ?? 0) > 0 && (

                      <div className="mt-3">

                        <p className="text-xs font-semibold uppercase text-muted-foreground">

                          Inclusions requested

                        </p>

                        <ul className="mt-1 list-inside list-disc text-sm">

                          {row.selected_inclusions!.map((item) => (

                            <li key={item}>{item}</li>

                          ))}

                        </ul>

                      </div>

                    )}

                    {(row.selected_exclusions?.length ?? 0) > 0 && (

                      <div className="mt-3">

                        <p className="text-xs font-semibold uppercase text-muted-foreground">

                          Exclusions noted

                        </p>

                        <ul className="mt-1 list-inside list-disc text-sm">

                          {row.selected_exclusions!.map((item) => (

                            <li key={item}>{item}</li>

                          ))}

                        </ul>

                      </div>

                    )}

                    {related.length > 0 && (

                      <div className="mt-4">

                        <p className="text-xs font-semibold uppercase text-muted-foreground">

                          Closed / older inquiry records

                        </p>

                        <ul className="mt-2 space-y-2">

                          {related.map((prev) => (

                            <li

                              key={prev.id}

                              className="rounded-lg border border-border px-3 py-2 text-xs"

                            >

                              <span className="font-mono font-medium">

                                {formatInquiryRef(prev.id)}

                              </span>

                              {" · "}

                              {prev.package_name || "General"}

                              {" · "}

                              {INQUIRY_STATUS_LABELS[prev.status ?? "new"]}

                              {" · "}

                              {new Date(prev.created_at).toLocaleDateString("en-IN")}

                            </li>

                          ))}

                        </ul>

                      </div>

                    )}

                    <div className="mt-4">

                      <label className="text-xs font-semibold uppercase text-muted-foreground">

                        Admin notes

                      </label>

                      <textarea

                        rows={2}

                        value={notesDraft[row.id] ?? row.admin_notes ?? ""}

                        onChange={(e) =>

                          setNotesDraft((prev) => ({ ...prev, [row.id]: e.target.value }))

                        }

                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"

                        placeholder="Internal notes about this lead…"

                      />

                      <button

                        type="button"

                        disabled={updatingId === row.id}

                        onClick={() => saveNotes(row.id)}

                        className="mt-2 rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50"

                      >

                        Save notes

                      </button>

                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                      <span className="text-xs text-muted-foreground">Update status:</span>

                      {(Object.keys(INQUIRY_STATUS_LABELS) as InquiryStatus[]).map((s) => (

                        <button

                          key={s}

                          type="button"

                          disabled={updatingId === row.id || status === s}

                          onClick={() => handleStatusChange(row.id, s)}

                          className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary disabled:opacity-50"

                        >

                          {INQUIRY_STATUS_LABELS[s]}

                        </button>

                      ))}

                    </div>

                  </div>

                )}

              </article>

            );

          })}

        </div>

      )}

    </div>

  );

}

