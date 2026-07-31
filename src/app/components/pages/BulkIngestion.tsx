import { Upload, FileText, CheckCircle, Clock, Download } from "lucide-react";

type IngestionItem = {
  id: string;
  filename: string;
  status: "processing" | "draft" | "ready" | "published";
  uploadedAt: string;
  pageCount: number;
};

const mockItems: IngestionItem[] = [
  { id: "1", filename: "ramayana-tamil.pdf", status: "published", uploadedAt: "2026-04-05", pageCount: 342 },
  { id: "2", filename: "mahabharata-hindi.pdf", status: "ready", uploadedAt: "2026-04-06", pageCount: 876 },
  { id: "3", filename: "vedas-collection.zip", status: "draft", uploadedAt: "2026-04-07", pageCount: 1250 },
  { id: "4", filename: "puranas-bengali.pdf", status: "processing", uploadedAt: "2026-04-07", pageCount: 524 },
];

const statusConfig = {
  processing: { label: "Processing", icon: Clock, color: "text-[var(--color-institutional-blue)] bg-[var(--color-institutional-blue)]/10 border-[var(--color-institutional-blue)]/20" },
  draft: { label: "Draft", icon: FileText, color: "text-muted-foreground bg-[var(--color-neutral-100)] border-border" },
  ready: { label: "Ready", icon: CheckCircle, color: "text-[var(--color-success-green-dark)] bg-[var(--color-success-green)]/10 border-[var(--color-success-green)]/20" },
  published: { label: "Published", icon: CheckCircle, color: "text-[var(--color-saffron)] bg-[var(--color-saffron)]/10 border-[var(--color-saffron)]/20" },
};

export function BulkIngestion() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Bulk Ingestion Pipeline</h1>
        <p className="text-sm text-[#43474e] font-normal leading-5">Automated PDF processing and catalog ingestion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-gradient-to-br from-card to-[var(--color-dawn-mid)] border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-institutional-blue)]/10 rounded-2xl mb-4">
              <Upload className="w-8 h-8 text-[var(--color-institutional-blue)]" />
            </div>
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-2">Upload PDFs for Processing</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm leading-relaxed">Upload single PDFs or batch ZIP files for automated extraction</p>
            <div className="flex gap-3 justify-center">
              <button className="px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-xl hover:bg-[var(--color-saffron-dark)] hover:shadow-md transition-all text-sm font-medium">
                Upload Files
              </button>
              <button className="px-5 py-2.5 border border-border bg-background/80 rounded-xl hover:bg-[var(--color-neutral-100)] hover:border-[var(--color-institutional-blue)] transition-all text-sm font-medium">
                Upload ZIP
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-xl mb-3 border border-amber-500/20">
              <Download className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-[15px] font-bold leading-[22px] text-[#191c1e] mb-1">Catalog Entry Templates</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Download pre-formatted client entry templates (100 rows with dropdown validations & instructions).
            </p>
          </div>
          <div className="space-y-2">
            <a
              href="/Amrita_Books_Catalog_Template_100_Books.xlsx"
              download="Amrita_Books_Catalog_Template_100_Books.xlsx"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all text-xs font-semibold shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Excel (.xlsx)
            </a>
            <a
              href="/Amrita_Books_Catalog_Template_100_Books.csv"
              download="Amrita_Books_Catalog_Template_100_Books.csv"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-border bg-background rounded-xl hover:bg-muted transition-all text-xs font-medium text-foreground"
            >
              <Download className="w-4 h-4" /> Download CSV (.csv)
            </a>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-6">Processing Pipeline</h3>
        <div className="grid grid-cols-4 gap-5">
          {["Upload", "Extract", "Draft Queue", "Publish"].map((step, index) => (
            <div key={step} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-institutional-blue)]/10 rounded-xl mx-auto mb-3 border border-[var(--color-institutional-blue)]/20">
                <span className="text-[var(--color-institutional-blue)] font-bold">{index + 1}</span>
              </div>
              <p className="text-sm text-foreground/80 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="px-8 py-5 border-b border-border bg-[#F8FAFC]">
          <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Ingestion Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Filename</th>
                <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Status</th>
                <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Pages</th>
                <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Uploaded</th>
                <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {mockItems.map((item) => {
                const config = statusConfig[item.status];
                const StatusIcon = config.icon;
                return (
                  <tr key={item.id} className="hover:bg-[var(--color-neutral-100)]/30 transition-all">
                    <td className="px-8 py-5 whitespace-nowrap font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{item.filename}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${config.color} border border-current/10`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">{config.label}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-foreground/70 whitespace-nowrap font-mono">{item.pageCount}</td>
                    <td className="px-8 py-5 text-muted-foreground whitespace-nowrap font-mono">{item.uploadedAt}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      {item.status === "ready" && (
                        <button className="px-4 py-2 bg-[var(--color-saffron)] text-white rounded-lg hover:bg-[var(--color-saffron-dark)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all text-sm font-medium">
                          Preview & Publish
                        </button>
                      )}
                      {item.status === "draft" && (
                        <button className="px-4 py-2 border border-border bg-background rounded-lg hover:bg-[var(--color-neutral-100)] hover:border-[var(--color-institutional-blue)] transition-all text-sm font-medium">
                          Assign Metadata
                        </button>
                      )}
                      {item.status === "published" && (
                        <span className="text-sm text-muted-foreground font-medium">Complete</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
