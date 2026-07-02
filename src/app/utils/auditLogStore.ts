export type AuditLogEntry = {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  severity: "info" | "warning" | "error" | "success";
};

const defaultLogs: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: "2026-07-02 10:15:30",
    user: "Rajesh Kumar",
    role: "Super Admin",
    module: "Catalog",
    action: "Updated price of Bhagavad Gita (English) variant to ₹299",
    severity: "info"
  },
  {
    id: "log-2",
    timestamp: "2026-07-02 10:45:12",
    user: "Amit Patel",
    role: "Inventory Staff",
    module: "Inventory",
    action: "Adjusted stock for Upanishads Collection (Physical) to 40",
    severity: "info"
  },
  {
    id: "log-3",
    timestamp: "2026-07-02 11:22:45",
    user: "Priya Sharma",
    role: "Catalog Manager",
    module: "Catalog",
    action: "Edited details for Upanishads Collection (author, volume)",
    severity: "success"
  },
  {
    id: "log-4",
    timestamp: "2026-07-02 12:05:10",
    user: "Rajesh Kumar",
    role: "Super Admin",
    module: "Orders",
    action: "Processed refund of ₹1,499 for Order #o-501",
    severity: "warning"
  }
];

export const getAuditLogs = (): AuditLogEntry[] => {
  const saved = localStorage.getItem("amrita_audit_logs");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultLogs;
    }
  }
  localStorage.setItem("amrita_audit_logs", JSON.stringify(defaultLogs));
  return defaultLogs;
};

export const addAuditLog = (module: string, action: string, severity: AuditLogEntry["severity"] = "info") => {
  const logs = getAuditLogs();
  
  // Fetch active admin session details
  let userName = "Super Admin";
  let userRole = "Super Admin";
  const savedActiveId = localStorage.getItem("amrita_active_admin_id");
  const savedAdmins = localStorage.getItem("amrita_admin_users");
  if (savedAdmins && savedActiveId) {
    try {
      const admins = JSON.parse(savedAdmins);
      const active = admins.find((a: any) => a.id === savedActiveId);
      if (active) {
        userName = active.name;
        userRole = active.role;
      }
    } catch (e) {}
  }

  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

  const newEntry: AuditLogEntry = {
    id: `log-${Date.now()}`,
    timestamp,
    user: userName,
    role: userRole,
    module,
    action,
    severity
  };

  const updated = [newEntry, ...logs];
  localStorage.setItem("amrita_audit_logs", JSON.stringify(updated));
  
  // Dispatch custom event to notify listeners
  window.dispatchEvent(new Event("audit_logs_updated"));
};
