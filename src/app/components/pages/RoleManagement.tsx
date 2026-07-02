import { useState, useEffect } from "react";
import { Shield, Users, Lock, Check, Edit2, Trash2, Plus, X, Key, HelpCircle } from "lucide-react";
import { addAuditLog } from "../../utils/auditLogStore";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  allowedModules: string[]; // names of modules from Layout navigation list
};

const defaultAdmins: AdminUser[] = [
  {
    id: "admin-1",
    name: "Rajesh Kumar",
    email: "rajesh.admin@amritabooks.com",
    role: "Super Admin",
    status: "Active",
    allowedModules: [
      "Dashboard",
      "Catalog",
      "Spotlight Banners",
      "Authors",
      "Orders",
      "Tracking",
      "Users",
      "Subscriptions",
      "Coupons",
      "Pricing Models",
      "Inventory",
      "Reports",
      "Finance",
      "Role Management"
    ]
  },
  {
    id: "admin-2",
    name: "Priya Sharma",
    email: "priya.catalog@amritabooks.com",
    role: "Catalog Manager",
    status: "Active",
    allowedModules: ["Dashboard", "Catalog", "Spotlight Banners", "Authors"]
  },
  {
    id: "admin-3",
    name: "Amit Patel",
    email: "amit.inventory@amritabooks.com",
    role: "Inventory Staff",
    status: "Active",
    allowedModules: ["Dashboard", "Inventory"]
  }
];

const MODULES_LIST = [
  "Dashboard",
  "Catalog",
  "Spotlight Banners",
  "Authors",
  "Orders",
  "Tracking",
  "Users",
  "Subscriptions",
  "Coupons",
  "Pricing Models",
  "Inventory",
  "Reports",
  "Finance",
  "Role Management"
];

export function RoleManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeAdminId, setActiveAdminId] = useState<string>("");

  // Load admins and current session user
  useEffect(() => {
    const saved = localStorage.getItem("amrita_admin_users");
    let loadedAdmins: AdminUser[] = [];
    if (saved) {
      try {
        loadedAdmins = JSON.parse(saved);
      } catch (e) {
        loadedAdmins = defaultAdmins;
      }
    } else {
      loadedAdmins = defaultAdmins;
      localStorage.setItem("amrita_admin_users", JSON.stringify(defaultAdmins));
    }
    setAdmins(loadedAdmins);

    const savedActive = localStorage.getItem("amrita_active_admin_id");
    if (savedActive && loadedAdmins.some(a => a.id === savedActive)) {
      setActiveAdminId(savedActive);
    } else if (loadedAdmins.length > 0) {
      setActiveAdminId(loadedAdmins[0].id);
      localStorage.setItem("amrita_active_admin_id", loadedAdmins[0].id);
    }
  }, []);

  const saveAdminsList = (updated: AdminUser[]) => {
    setAdmins(updated);
    localStorage.setItem("amrita_admin_users", JSON.stringify(updated));
    // Trigger custom event to notify Layout sidebar of changes
    window.dispatchEvent(new Event("admin_session_changed"));
  };

  const handleToggleStatus = (id: string) => {
    const targetAdmin = admins.find(a => a.id === id);
    const newStatus = targetAdmin?.status === "Active" ? "Inactive" : "Active";
    const updated = admins.map(a => 
      a.id === id ? { ...a, status: a.status === "Active" ? "Inactive" as const : "Active" as const } : a
    );
    saveAdminsList(updated);
    if (targetAdmin) {
      addAuditLog("Roles", `Toggled account status for administrator "${targetAdmin.name}" to ${newStatus}`, "warning");
    }
  };

  const handleDeleteAdmin = (id: string, name: string) => {
    if (id === activeAdminId) {
      alert("Cannot delete the currently active session user.");
      return;
    }
    if (confirm(`Are you sure you want to delete administrator "${name}"?`)) {
      const filtered = admins.filter(a => a.id !== id);
      saveAdminsList(filtered);
      addAuditLog("Roles", `Deleted administrator "${name}"`, "error");
    }
  };

  const handleSwitchSession = (id: string) => {
    setActiveAdminId(id);
    localStorage.setItem("amrita_active_admin_id", id);
    window.dispatchEvent(new Event("admin_session_changed"));
  };

  const handleStartEdit = (admin: AdminUser) => {
    setEditingAdmin({ ...admin });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    if (!editingAdmin.name.trim() || !editingAdmin.email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    const updated = admins.map(a => a.id === editingAdmin.id ? editingAdmin : a);
    saveAdminsList(updated);
    addAuditLog("Roles", `Updated profile/permissions for administrator "${editingAdmin.name}" (${editingAdmin.role}). Access modules: [${editingAdmin.allowedModules.join(", ")}]`, "info");
    setEditingAdmin(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    if (!editingAdmin.name.trim() || !editingAdmin.email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    const newAdmin: AdminUser = {
      ...editingAdmin,
      id: `admin-${Date.now()}`
    };

    const updated = [...admins, newAdmin];
    saveAdminsList(updated);
    addAuditLog("Roles", `Created new administrator account "${newAdmin.name}" with role "${newAdmin.role}"`, "success");
    setShowAddModal(false);
    setEditingAdmin(null);
  };

  const toggleModulePermission = (moduleName: string) => {
    if (!editingAdmin) return;
    const isAllowed = editingAdmin.allowedModules.includes(moduleName);
    const updatedModules = isAllowed
      ? editingAdmin.allowedModules.filter(m => m !== moduleName)
      : [...editingAdmin.allowedModules, moduleName];
    setEditingAdmin({
      ...editingAdmin,
      allowedModules: updatedModules
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B] flex items-center gap-2">
            <Shield className="w-8 h-8 text-[var(--color-saffron)]" />
            Role-Based Access Control (RBAC)
          </h1>
          <p className="text-sm text-[#64748B] font-normal mt-1">
            Assign administrators and manage modular permissions. Enable or restrict access to specific management views.
          </p>
        </div>
        
        <button
          onClick={() => {
            setEditingAdmin({
              id: "new",
              name: "",
              email: "",
              role: "Custom Admin",
              status: "Active",
              allowedModules: ["Dashboard"]
            });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg text-[13px] font-semibold shadow-sm transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Administrator
        </button>
      </div>

      {/* Simulator Info Box */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
          <div className="text-[13px] text-[#1E3A8A]">
            <p className="font-bold">Interactive RBAC Simulator</p>
            <p className="text-[#1E40AF]/80 mt-0.5">
              Switch the active simulation session using the dropdown on the right. The sidebar and route navigation will dynamically adapt to reflect the selected user's module permissions!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 bg-white px-3 py-1.5 border border-[#BFDBFE] rounded-lg shadow-sm">
          <span className="text-[11px] font-bold text-[#1E3A8A] uppercase">Active Session:</span>
          <select
            value={activeAdminId}
            onChange={(e) => handleSwitchSession(e.target.value)}
            className="text-xs font-bold text-[#002045] border-none bg-transparent focus:outline-none cursor-pointer"
          >
            {admins.map((adm) => (
              <option key={adm.id} value={adm.id}>
                {adm.name} ({adm.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#002045]/5 text-[#002045]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Total Administrators</p>
            <p className="text-2xl font-bold text-[#1E293B] mt-0.5">{admins.length}</p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Active Status Admins</p>
            <p className="text-2xl font-bold text-green-700 mt-0.5">
              {admins.filter(a => a.status === "Active").length}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">System Modules Available</p>
            <p className="text-2xl font-bold text-amber-700 mt-0.5">{MODULES_LIST.length}</p>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-4 border-b border-[#F1F5F9] bg-white">
          <h3 className="text-[15px] font-bold text-[#1E293B]">Administrators List</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Manage details and module access policies.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="px-5 py-3">Administrator</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Module Permissions ({MODULES_LIST.length})</th>
                <th className="px-5 py-3 text-center w-24">Status</th>
                <th className="px-5 py-3 text-right w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-xs">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500 italic">
                    No administrators configured.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className={`hover:bg-[#F8FAFC] transition-colors ${admin.id === activeAdminId ? "bg-blue-50/20" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#002045]/10 text-[#002045] font-bold flex items-center justify-center text-xs">
                          {admin.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#1E293B] flex items-center gap-1.5">
                            {admin.name}
                            {admin.id === activeAdminId && (
                              <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.25 rounded-full uppercase tracking-wider">
                                Active Session
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-[#64748B] font-mono mt-0.5">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#475569]">{admin.role}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[400px]">
                        {admin.allowedModules.length === MODULES_LIST.length ? (
                          <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                            All Modules Access (Super Admin)
                          </span>
                        ) : admin.allowedModules.length === 0 ? (
                          <span className="bg-red-50 border border-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> No Access
                          </span>
                        ) : (
                          admin.allowedModules.map((m) => (
                            <span key={m} className="bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {m}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border-none cursor-pointer select-none transition-colors ${
                          admin.status === "Active" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {admin.status}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(admin)}
                          className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#475569] rounded-lg transition-colors cursor-pointer"
                          title="Edit Admin permissions"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                          disabled={admin.id === activeAdminId}
                          className="p-1.5 bg-[#FEF2F2] border border-[#FEE2E2] hover:bg-[#FEE2E2] hover:text-[#DC2626] text-[#EF4444] rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                          title="Delete Administrator"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal Form */}
      {(editingAdmin || showAddModal) && editingAdmin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
              <h2 className="text-[20px] font-semibold leading-[28px] text-[#191c1e] flex items-center gap-2">
                <Key className="w-5 h-5 text-[var(--color-saffron)]" />
                {showAddModal ? "Configure New Administrator" : "Edit Permissions Policy"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingAdmin(null);
                  setShowAddModal(false);
                }}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <form onSubmit={showAddModal ? handleCreateNew : handleSaveEdit} className="space-y-4 text-left text-[13px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-foreground">Name</label>
                  <input
                    type="text"
                    required
                    value={editingAdmin.name}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all"
                    placeholder="e.g., Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    required
                    value={editingAdmin.email}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all"
                    placeholder="e.g., rajesh@amritabooks.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-foreground">Designated Role</label>
                  <input
                    type="text"
                    required
                    value={editingAdmin.role}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all"
                    placeholder="e.g., Catalog Manager"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-foreground">Status</label>
                  <select
                    value={editingAdmin.status}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Module Checklist */}
              <div>
                <label className="block mb-2 font-semibold text-foreground">Assign Allowed Modules</label>
                <p className="text-xs text-muted-foreground mb-3">Check the modules that this administrator should have access to in their sidebar navigation.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 p-4 bg-slate-50 border border-border rounded-xl">
                  {MODULES_LIST.map((module) => {
                    const isChecked = editingAdmin.allowedModules.includes(module);
                    return (
                      <button
                        key={module}
                        type="button"
                        onClick={() => toggleModulePermission(module)}
                        className={`flex items-center gap-2.5 p-2 rounded-lg border text-left cursor-pointer transition-all ${
                          isChecked 
                            ? "bg-blue-50 border-blue-200 text-blue-900 font-semibold" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                          isChecked ? "bg-[#002045] border-[#002045] text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                        </div>
                        <span className="text-[12px] truncate">{module}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-3 border-t border-[#E2E8F0] mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingAdmin(null);
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-5 py-2.5 border border-border rounded-lg hover:bg-slate-50 transition-all font-semibold text-sm cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-5 py-2.5 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg transition-all font-semibold text-sm cursor-pointer shadow-sm border-none"
                >
                  {showAddModal ? "Create Administrator" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
