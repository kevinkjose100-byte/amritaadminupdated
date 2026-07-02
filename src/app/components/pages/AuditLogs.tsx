import { useState, useEffect } from "react";
import { Search, FileText, Trash2, Calendar, Shield, RefreshCw } from "lucide-react";
import { getAuditLogs, addAuditLog, AuditLogEntry } from "../../utils/auditLogStore";

const severityColors = {
  info: "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]",
  success: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
  warning: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
  error: "bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]",
};

export function AuditLogs() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [moduleFilter, setModuleFilter] = useState("All");

  const loadLogs = () => {
    setLogs(getAuditLogs());
  };

  useEffect(() => {
    loadLogs();
    
    const handleUpdate = () => {
      loadLogs();
    };

    window.addEventListener("audit_logs_updated", handleUpdate);
    return () => {
      window.removeEventListener("audit_logs_updated", handleUpdate);
    };
  }, []);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all audit logs?")) {
      localStorage.removeItem("amrita_audit_logs");
      loadLogs();
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === "All" || log.severity === severityFilter.toLowerCase();
    const matchesModule = moduleFilter === "All" || log.module === moduleFilter;

    return matchesSearch && matchesSeverity && matchesModule;
  });

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B]">Admin Audit Logs</h1>
          <p className="text-sm text-[#64748B] font-normal leading-5">Track history of administrative actions, pricing edits, and configuration updates</p>
        </div>
        <button 
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FCA5A5]/20 text-sm font-semibold rounded-lg transition-colors border border-[#FEE2E2]"
        >
          <Trash2 className="w-4 h-4" />
          Clear Log History
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {/* Search */}
        <div className="px-4 pt-4 pb-3 border-b border-[#E2E8F0]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search audit logs by admin name, action details, or module..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all"
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="px-4 py-3 border-b border-[#E2E8F0] flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6A7282]">Severity Tier</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 text-[13px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-md focus:outline-none focus:border-[#002045]/40 min-w-[160px]"
            >
              <option value="All">All Severities</option>
              <option value="Info">Info</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Error">Critical / Error</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6A7282]">Module Source</label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="px-3 py-2 text-[13px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-md focus:outline-none focus:border-[#002045]/40 min-w-[160px]"
            >
              <option value="All">All Modules</option>
              <option value="Catalog">Catalog</option>
              <option value="Inventory">Inventory</option>
              <option value="Orders">Orders</option>
              <option value="Users">Users</option>
              <option value="Banners">Banners</option>
              <option value="Roles">Roles</option>
            </select>
          </div>
          <button
            onClick={() => { setSeverityFilter("All"); setModuleFilter("All"); setSearchQuery(""); }}
            className="text-[13px] font-medium text-[#64748B] hover:text-[#1E293B] transition-colors pb-2"
          >
            Reset Filters
          </button>
        </div>

        {/* List of logs */}
        <div className="divide-y divide-[#F1F5F9] max-h-[600px] overflow-y-auto bg-white">
          {filteredLogs.length === 0 ? (
            <div className="py-16 text-center text-slate-400 italic text-sm">
              No matching activity logs found.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors">
                {/* Badge Icon based on module */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
                  <Shield className="w-5 h-5 text-slate-500" />
                </div>
                
                {/* Action details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-xs text-[#1E293B]">{log.user}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.25 rounded font-mono uppercase tracking-wider">
                      {log.role}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">Module: {log.module}</span>
                  </div>
                  
                  <p className="text-[13px] text-[#475569] mt-1.5 leading-relaxed">{log.action}</p>
                  
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                {/* Severity pill */}
                <span className={`px-2 py-0.5 border text-[9px] font-bold rounded-full uppercase tracking-wider ${severityColors[log.severity]}`}>
                  {log.severity}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
