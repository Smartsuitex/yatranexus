import type { Inquiry } from "@/lib/db-types";
import { INQUIRY_STATUS_LABELS } from "@/lib/admin-api";

function csvEscape(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function inquiriesToCsv(rows: Inquiry[]): string {
  const headers = [
    "ID",
    "Created",
    "Status",
    "Name",
    "Phone",
    "Email",
    "Subject",
    "Service",
    "Package",
    "Destination",
    "Travel Date",
    "Travelers",
    "Message",
    "Source Page",
    "Admin Notes",
  ];

  const lines = rows.map((row) =>
    [
      row.id,
      row.created_at,
      INQUIRY_STATUS_LABELS[row.status ?? "new"],
      row.name,
      row.phone,
      row.email,
      row.subject,
      row.service_type,
      row.package_name,
      row.destination,
      row.travel_date,
      row.travelers,
      row.message,
      row.source_page,
      row.admin_notes,
    ]
      .map(csvEscape)
      .join(","),
  );

  return [headers.join(","), ...lines].join("\n");
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadInquiriesPdf(rows: Inquiry[]) {
  const html = `<!DOCTYPE html><html><head><title>Inquiries Export</title>
    <style>
      body { font-family: Arial, sans-serif; font-size: 12px; padding: 24px; }
      h1 { font-size: 18px; }
      table { width: 100%; border-collapse: collapse; margin-top: 16px; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
      th { background: #f5f5f5; }
      tr { page-break-inside: avoid; break-inside: avoid; }
      @media print {
        table { page-break-inside: auto; }
        tr { page-break-inside: avoid; break-inside: avoid; }
      }
    </style></head><body>
    <h1>YatraNexus — Inquiries Export</h1>
    <p>Generated: ${new Date().toLocaleString("en-IN")} · ${rows.length} records</p>
    <table>
      <thead><tr>
        <th>Date</th><th>Status</th><th>Name</th><th>Phone</th><th>Email</th>
        <th>Service</th><th>Package</th><th>Destination</th><th>Message</th>
      </tr></thead>
      <tbody>
        ${rows
          .map(
            (row) => `<tr>
              <td>${new Date(row.created_at).toLocaleString("en-IN")}</td>
              <td>${INQUIRY_STATUS_LABELS[row.status ?? "new"]}</td>
              <td>${row.name}</td>
              <td>${row.phone}</td>
              <td>${row.email ?? ""}</td>
              <td>${row.service_type}</td>
              <td>${row.package_name ?? ""}</td>
              <td>${row.destination ?? ""}</td>
              <td>${(row.message ?? "").replace(/</g, "&lt;")}</td>
            </tr>`,
          )
          .join("")}
      </tbody>
    </table>
    <script>window.onload = () => window.print();</script>
  </body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}
