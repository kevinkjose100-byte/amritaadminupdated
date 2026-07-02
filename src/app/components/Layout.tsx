import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import logo from "../../imports/image.png";
import {
  LayoutDashboard,
  BookOpen,
  Package,
  MapPin,
  Users,
  Archive,
  DollarSign,
  Truck,
  Search,
  Bell,
  Crown,
  Globe,
  Feather,
  Tag,
  BarChart3,
  Sparkles,
  Shield,
  Lock,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Catalog", path: "/catalog", icon: BookOpen },
  { name: "Spotlight Banners", path: "/banners", icon: Sparkles },
  { name: "Authors", path: "/authors", icon: Feather },
  { name: "Orders", path: "/orders", icon: Package },
  { name: "Tracking", path: "/tracking", icon: MapPin },
  { name: "Users", path: "/users", icon: Users },
  { name: "Subscriptions", path: "/subscriptions", icon: Crown },
  { name: "Coupons", path: "/coupons", icon: Tag },
  { name: "Pricing Models", path: "/pricing-models", icon: Globe },
  { name: "Inventory", path: "/inventory", icon: Archive },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Finance", path: "/finance", icon: DollarSign },
  { name: "Role Management", path: "/rbac", icon: Shield },
  { name: "Audit Logs", path: "/audit-logs", icon: FileText },
  // { name: "Consignment", path: "/consignment", icon: Truck },
];

const defaultAdmins = [
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
      "Role Management",
      "Audit Logs"
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

export function Layout() {
  const [activeAdmin, setActiveAdmin] = useState<any>(null);
  const [adminsList, setAdminsList] = useState<any[]>(defaultAdmins);

  useEffect(() => {
    const loadSession = () => {
      const saved = localStorage.getItem("amrita_admin_users");
      let loadedAdmins = defaultAdmins;
      if (saved) {
        try {
          loadedAdmins = JSON.parse(saved);
        } catch (e) {}
      }
      setAdminsList(loadedAdmins);
      const savedActive = localStorage.getItem("amrita_active_admin_id");
      const current = loadedAdmins.find(a => a.id === savedActive) || loadedAdmins[0];
      setActiveAdmin(current);
    };

    loadSession();

    window.addEventListener("admin_session_changed", loadSession);
    return () => {
      window.removeEventListener("admin_session_changed", loadSession);
    };
  }, []);

  if (activeAdmin && activeAdmin.status === "Inactive") {
    return (
      <div className="flex h-screen bg-[#F8FAFC] items-center justify-center p-4">
        <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl max-w-md shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">Account Deactivated</h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Your administrator account (<strong>{activeAdmin.name}</strong>) has been set to Inactive. Please contact a Super Admin or switch to a different session user to regain access.
          </p>
          <div className="pt-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-left">
              Switch Session Profile:
            </label>
            <select
              value={activeAdmin.id}
              onChange={(e) => {
                localStorage.setItem("amrita_active_admin_id", e.target.value);
                window.dispatchEvent(new Event("admin_session_changed"));
              }}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-bold text-[#002045] focus:outline-none cursor-pointer"
            >
              {adminsList.map((adm) => (
                <option key={adm.id} value={adm.id}>
                  {adm.name} ({adm.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Filter navigation links
  const allowedNavigation = navigation.filter(item => 
    activeAdmin?.allowedModules?.includes(item.name)
  );

  const initials = activeAdmin ? activeAdmin.name.split(" ").map((n: any) => n[0]).join("").slice(0, 2).toUpperCase() : "A";

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside className="w-56 bg-white border-r border-[#E2E8F0] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="pt-6 pb-4 px-5 border-b border-[#E2E8F0] flex flex-col items-start">
          <img src={logo} alt="Amrita Books" className="h-[44px] w-auto object-contain" />
          <p className="text-[10px] text-[#94A3B8] font-semibold tracking-[1.2px] mt-2 uppercase">Admin Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
          {allowedNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 text-[14px] font-medium ${
                  isActive
                    ? "bg-[#002045] text-white"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px] stroke-[1.75px] flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User bottom */}
        <div className="p-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#002045] flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#1E293B] truncate">{activeAdmin?.name || "Admin"}</p>
              <p className="text-[11px] text-[#94A3B8] truncate">{activeAdmin?.email || "admin@amritabooks.com"}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[60px] border-b border-[#E2E8F0] bg-white px-6 flex items-center justify-between relative z-10">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search catalog, orders, users..."
                className="w-full pl-9 pr-4 py-2 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] focus:outline-none focus:bg-white focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Profile switcher inside header for high fidelity simulation */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-[#475569]">
              <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400">User:</span>
              <select
                value={activeAdmin?.id || ""}
                onChange={(e) => {
                  localStorage.setItem("amrita_active_admin_id", e.target.value);
                  window.dispatchEvent(new Event("admin_session_changed"));
                }}
                className="font-semibold text-[#002045] bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {adminsList.map((adm) => (
                  <option key={adm.id} value={adm.id}>
                    {adm.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="relative p-2 hover:bg-[#F1F5F9] rounded-lg transition-all">
              <Bell className="w-[18px] h-[18px] text-[#64748B]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#002045] rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#002045] flex items-center justify-center text-white text-[12px] font-semibold">
                {initials}
              </div>
              <span className="text-[14px] font-medium text-[#1E293B] hidden md:inline">{activeAdmin?.name || "Admin"}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-6 py-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
