import { useState } from "react";
import { 
  Upload, 
  FileUp, 
  Plus, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Truck, 
  AlertTriangle, 
  Copy, 
  FileText 
} from "lucide-react";

type ConsignmentEntry = {
  orderNumber: string;
  trackingNumber: string;
  status: "valid" | "invalid";
  error?: string;
};

export function ConsignmentManagement() {
  const [manualTracking, setManualTracking] = useState("");
  const [manualOrder, setManualOrder] = useState("");
  const [courier, setCourier] = useState<"india-post" | "dtdc">("india-post");
  const [validationError, setValidationError] = useState("");
  const [entries, setEntries] = useState<ConsignmentEntry[]>([]);
  const [isHelpExpanded, setIsHelpExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (courier === "india-post") {
      const indiaPostRegex = /^[A-Z0-9]{11}IN$/i;
      if (!indiaPostRegex.test(manualTracking)) {
        setValidationError("Invalid tracking number. India Post tracking numbers must be a 13-character alphanumeric string ending in 'IN'");
        return;
      }
    }

    if (courier === "dtdc" && !/^[Nn]\d{8}$/.test(manualTracking)) {
      setValidationError("Invalid DTDC reference number. DTDC reference numbers must start with 'N' followed by 8 digits (e.g., N21996707)");
      return;
    }

    if (!manualOrder) {
      setValidationError("Order number is required");
      return;
    }

    setEntries([
      { orderNumber: manualOrder, trackingNumber: manualTracking, status: "valid" },
      ...entries,
    ]);
    setManualTracking("");
    setManualOrder("");
    setValidationError("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv')) {
        // Add mock CSV entries
        setEntries([
          { orderNumber: "AMR-9988", trackingNumber: "RN887766554IN", status: "valid" },
          { orderNumber: "AMR-9989", trackingNumber: "N21996707", status: "valid" },
          ...entries
        ]);
        alert(`CSV file "${file.name}" uploaded successfully!`);
      } else {
        alert("Please upload a valid CSV file");
      }
    }
  };

  const handleFileSelect = () => {
    // Mock file input trigger
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setEntries([
          { orderNumber: "AMR-9988", trackingNumber: "RN887766554IN", status: "valid" },
          { orderNumber: "AMR-9989", trackingNumber: "N21996707", status: "valid" },
          ...entries
        ]);
        alert(`CSV file "${file.name}" uploaded successfully!`);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Consignment Management</h1>
        <p className="text-sm text-[#43474e] font-normal leading-5">Manage tracking numbers via manual entry or CSV upload</p>
      </div>

      <div className="space-y-5">
        {/* Main cards: full-width 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Manual Entry Card */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[var(--color-success-green)]/10 rounded-xl">
                      <Plus className="w-5 h-5 text-[var(--color-success-green-dark)]" />
                    </div>
                    <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Manual Entry</h3>
                  </div>

                  <form onSubmit={handleManualSubmit} className="space-y-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-foreground">Order Number</label>
                      <input
                        type="text"
                        value={manualOrder}
                        onChange={(e) => {
                          setManualOrder(e.target.value);
                          setValidationError("");
                        }}
                        placeholder="e.g., AMR-2847"
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-foreground">Courier Service</label>
                      <select
                        value={courier}
                        onChange={(e) => {
                          setCourier(e.target.value as "india-post" | "dtdc");
                          setManualTracking("");
                          setValidationError("");
                        }}
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                      >
                        <option value="india-post">India Post (Normal Shipping)</option>
                        <option value="dtdc">DTDC Express (Premium Shipping)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-foreground">
                        {courier === "india-post" ? "India Post" : "DTDC Express"} Consignment/Tracking Number
                      </label>
                      <input
                        type="text"
                        value={manualTracking}
                        onChange={(e) => {
                          setManualTracking(e.target.value);
                          setValidationError("");
                        }}
                        placeholder={courier === "india-post" ? "e.g., RN123456789IN" : "e.g., N21996707"}
                        className={`w-full px-4 py-3 bg-input-background rounded-xl border ${
                          validationError ? "border-destructive" : "border-border"
                        } focus:outline-none focus:ring-2 ${
                          validationError ? "focus:ring-destructive/30" : "focus:ring-[var(--color-institutional-blue)]/25"
                        } transition-all text-sm`}
                      />
                    </div>

                    {validationError && (
                      <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/15 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-destructive leading-relaxed">{validationError}</p>
                      </div>
                    )}
                  </form>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleManualSubmit}
                    type="button"
                    className="w-full px-5 py-3 bg-[var(--color-saffron)] text-white rounded-xl hover:bg-[var(--color-saffron-dark)] hover:shadow-md transition-all font-medium text-sm"
                  >
                    Add Tracking Number
                  </button>
                </div>
              </div>
            </div>

            {/* CSV Bulk Upload Card */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[var(--color-institutional-blue)]/10 rounded-xl">
                      <FileUp className="w-5 h-5 text-[var(--color-institutional-blue)]" />
                    </div>
                    <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">CSV Bulk Upload</h3>
                  </div>

                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileSelect}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
                      isDragging 
                        ? "border-[var(--color-institutional-blue)] bg-[var(--color-institutional-blue)]/5 scale-[0.99]" 
                        : "border-border hover:border-[var(--color-institutional-blue)] hover:bg-[var(--color-institutional-blue)]/5"
                    }`}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-4 transition-transform ${isDragging ? "text-[var(--color-institutional-blue)] scale-110" : "text-muted-foreground"}`} />
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-foreground">Drop CSV file here or click to browse</p>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                      Format: order_number, courier, tracking_number
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="p-3 bg-[#F8FAFC] rounded-xl mb-4 border border-[#E2E8F0]">
                    <p className="text-xs font-semibold mb-2 text-foreground/80">Expected CSV format:</p>
                    <pre className="text-[10px] font-mono text-muted-foreground leading-normal">
                      order_number,courier,tracking_number{"\n"}
                      AMR-2847,india-post,RN123456789IN{"\n"}
                      AMR-2848,dtdc,N21996707
                    </pre>
                  </div>
                  <button 
                    onClick={handleFileSelect}
                    className="w-full px-5 py-3 border border-border bg-background rounded-xl hover:bg-[var(--color-neutral-100)] hover:border-[var(--color-institutional-blue)] transition-all text-sm font-medium text-foreground"
                  >
                    Select File
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Entries */}
          {entries.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] animate-[fadeIn_0.3s_ease-out]">
              <div className="px-8 py-5 border-b border-border bg-[#F8FAFC]">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Recent Entries</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Order Number</th>
                      <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Tracking Number</th>
                      <th className="text-left px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {entries.map((entry, index) => (
                      <tr key={index} className="hover:bg-[var(--color-neutral-100)]/30 transition-all">
                        <td className="px-8 py-5 font-semibold text-foreground whitespace-nowrap">{entry.orderNumber}</td>
                        <td className="px-8 py-5 font-mono text-sm text-foreground/70 whitespace-nowrap">{entry.trackingNumber}</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          {entry.status === "valid" ? (
                            <span className="px-3.5 py-1.5 bg-[var(--color-success-green)]/10 text-[var(--color-success-green-dark)] border border-[var(--color-success-green)]/20 rounded-full text-xs font-semibold">
                              Valid
                            </span>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="px-3.5 py-1.5 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-xs font-semibold">
                                Invalid
                              </span>
                              {entry.error && (
                                <span className="text-sm text-muted-foreground">{entry.error}</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Courier Guidelines — full-width collapsible */}
        <div>
          <div className="bg-card border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300">
            <div 
              onClick={() => setIsHelpExpanded(!isHelpExpanded)} 
              className="flex items-center justify-between p-6 cursor-pointer select-none border-b border-[#E2E8F0] hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-[var(--color-saffron)]" />
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Courier Guidelines</h3>
              </div>
              {isHelpExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
              )}
            </div>

            {isHelpExpanded && (
              <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="flex items-start gap-3 p-3 bg-card border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[var(--color-institutional-blue)]/30 transition-all">
                  <Globe className="w-5 h-5 text-[var(--color-institutional-blue)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">India Post Format</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Tracking numbers must end with 'IN' (e.g., RN123456789IN).</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-card border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[var(--color-institutional-blue)]/30 transition-all">
                  <Truck className="w-5 h-5 text-[var(--color-saffron)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">DTDC Express Format</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Consignment numbers must start with 'N' followed by 8 digits (e.g., N21996707).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-card border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-destructive/30 transition-all">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">RTS (Return to Sender)</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Delivery failures are automatically flagged as high priority in the Tracking System.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-card border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-amber-500/30 transition-all">
                  <Copy className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Duplicate Detection</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Alerts are prompted to verify before overwriting any active entries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-card border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-emerald-500/30 transition-all">
                  <FileText className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">CSV Validation</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Checks order formats line-by-line before import queue.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

