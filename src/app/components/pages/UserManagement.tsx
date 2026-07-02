import { useState } from "react";
import { Search, Eye, Edit2, RotateCcw } from "lucide-react";
import { addAuditLog } from "../../utils/auditLogStore";
import { InvoiceModal } from "../InvoiceModal";

type Purchase = {
  id: string;
  date: string;
  title: string;
  price: number;
  type: "Digital" | "Physical";
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  libraryCount: number;
  orderCount: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended";
  subscriptionStatus: "Premium Active" | "Basic Active" | "Expired" | "None";
  lastActive: string;
  purchaseHistory: Purchase[];
};

const avatarColors = [
  "#4F46E5", "#0891B2", "#059669", "#D97706", "#DC2626",
  "#7C3AED", "#0D9488", "#BE185D", "#1D4ED8", "#16A34A",
];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const bg = avatarColors[index % avatarColors.length];
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0" style={{ backgroundColor: bg }}>
      {initials}
    </div>
  );
}

const mockUsers: User[] = [
  { 
    id: "1", 
    name: "Rajesh Kumar", 
    email: "rajesh.kumar@example.com", 
    phone: "+91 98765 43210", 
    joinedDate: "2024-03-12", 
    libraryCount: 45, 
    orderCount: 8, 
    totalSpent: 12450, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-20",
    purchaseHistory: [
      { id: "o-101", date: "2026-06-15", title: "Bhagavad Gita (Physical)", price: 499, type: "Physical" },
      { id: "o-102", date: "2026-04-12", title: "Ramayana (Digital)", price: 399, type: "Digital" },
      { id: "o-103", date: "2026-02-18", title: "Mahabharata (Physical)", price: 999, type: "Physical" },
      { id: "o-104", date: "2025-12-05", title: "Upanishads Collection (Physical)", price: 799, type: "Physical" }
    ]
  },
  { 
    id: "2", 
    name: "Priya Sharma", 
    email: "priya.sharma@example.com", 
    phone: "+91 87654 32109", 
    joinedDate: "2025-01-05", 
    libraryCount: 23, 
    orderCount: 3, 
    totalSpent: 4280, 
    status: "Active", 
    subscriptionStatus: "Basic Active",
    lastActive: "2026-06-18",
    purchaseHistory: [
      { id: "o-201", date: "2026-05-10", title: "Vedas Complete Set (Digital)", price: 799, type: "Digital" },
      { id: "o-202", date: "2025-03-24", title: "Yoga Sutras (Physical)", price: 449, type: "Physical" }
    ]
  },
  { 
    id: "3", 
    name: "Amit Patel", 
    email: "amit.patel@example.com", 
    phone: "+91 76543 21098", 
    joinedDate: "2023-11-20", 
    libraryCount: 67, 
    orderCount: 12, 
    totalSpent: 18900, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-21",
    purchaseHistory: [
      { id: "o-301", date: "2026-06-01", title: "Bhagavad Gita (Physical)", price: 499, type: "Physical" },
      { id: "o-302", date: "2026-03-15", title: "Mahabharata (Physical)", price: 999, type: "Physical" },
      { id: "o-303", date: "2025-11-10", title: "Upanishads Collection (Digital)", price: 449, type: "Digital" }
    ]
  },
  { 
    id: "4", 
    name: "Sneha Reddy", 
    email: "sneha.reddy@example.com", 
    phone: "+91 65432 10987", 
    joinedDate: "2024-07-30", 
    libraryCount: 31, 
    orderCount: 5, 
    totalSpent: 7600, 
    status: "Active", 
    subscriptionStatus: "Expired",
    lastActive: "2026-06-15",
    purchaseHistory: [
      { id: "o-401", date: "2025-09-12", title: "Ramayana (Physical)", price: 699, type: "Physical" },
      { id: "o-402", date: "2024-11-05", title: "Bhagavad Gita (Digital)", price: 299, type: "Digital" }
    ]
  },
  { 
    id: "5", 
    name: "Lakshmi Iyer", 
    email: "lakshmi.iyer@example.com", 
    phone: "+91 54321 09876", 
    joinedDate: "2025-03-14", 
    libraryCount: 14, 
    orderCount: 2, 
    totalSpent: 1890, 
    status: "Inactive", 
    subscriptionStatus: "None",
    lastActive: "2026-04-02",
    purchaseHistory: [
      { id: "o-501", date: "2025-04-18", title: "Yoga Sutras (Digital)", price: 249, type: "Digital" }
    ]
  },
  { 
    id: "6", 
    name: "Venkat Rao", 
    email: "venkat.rao@example.com", 
    phone: "+91 43210 98765", 
    joinedDate: "2023-08-05", 
    libraryCount: 52, 
    orderCount: 9, 
    totalSpent: 14200, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-19",
    purchaseHistory: [
      { id: "o-601", date: "2026-05-22", title: "Upanishads Collection (Physical)", price: 799, type: "Physical" }
    ]
  },
  { 
    id: "7", 
    name: "Meena Krishnan", 
    email: "meena.krishnan@example.com", 
    phone: "+91 32109 87654", 
    joinedDate: "2025-05-20", 
    libraryCount: 8, 
    orderCount: 1, 
    totalSpent: 850, 
    status: "Suspended", 
    subscriptionStatus: "None",
    lastActive: "2026-02-10",
    purchaseHistory: [
      { id: "o-701", date: "2025-06-12", title: "Bhagavad Gita (Digital)", price: 299, type: "Digital" }
    ]
  },
  { 
    id: "8", 
    name: "Arjun Mehta", 
    email: "arjun.mehta@example.com", 
    phone: "+91 21098 76543", 
    joinedDate: "2024-01-18", 
    libraryCount: 39, 
    orderCount: 7, 
    totalSpent: 9340, 
    status: "Active", 
    subscriptionStatus: "Basic Active",
    lastActive: "2026-06-22",
    purchaseHistory: [
      { id: "o-801", date: "2026-02-28", title: "Ramayana (Physical)", price: 699, type: "Physical" }
    ]
  },
];

const statusBadge = {
  Active: "bg-[#DCFCE7] text-[#15803D]",
  Inactive: "bg-[#F1F5F9] text-[#475569]",
  Suspended: "bg-[#FEE2E2] text-[#B91C1C]",
};

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [invoicePreviewOrder, setInvoicePreviewOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = appliedStatus === "All" || u.status === appliedStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B]">User Management</h1>
          <p className="text-sm text-[#64748B] font-normal leading-5">Manage customer accounts, purchase history, and library access</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#002045] text-white text-sm font-semibold rounded-lg hover:bg-[#001b3c] transition-colors">
          + Add New User
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

        {/* Search */}
        <div className="px-4 pt-4 pb-3 border-b border-[#E2E8F0]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search by customer name or email address..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 focus:ring-2 focus:ring-[#002045]/10 transition-all"
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="px-4 py-3 border-b border-[#E2E8F0] flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6A7282]">Account Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-[13px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-md focus:outline-none focus:border-[#002045]/40 min-w-[160px]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6A7282]">Region</label>
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="px-3 py-2 text-[13px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-md focus:outline-none focus:border-[#002045]/40 min-w-[160px]"
            >
              <option value="All">All Regions</option>
              <option value="India">India</option>
              <option value="International">International</option>
            </select>
          </div>
          <button
            onClick={() => { setAppliedStatus(statusFilter); setCurrentPage(1); }}
            className="px-4 py-2 bg-[#002045] text-white text-[13px] font-semibold rounded-lg hover:bg-[#001b3c] transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() => { setStatusFilter("All"); setRegionFilter("All"); setAppliedStatus("All"); setCurrentPage(1); }}
            className="text-[13px] font-medium text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Customer Name</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Email Address</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Phone Number</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Library Size</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Orders Placed</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Total Spent</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Account Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Last Active</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, idx) => (
                <tr key={user.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  {/* Name + avatar */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} index={idx + (currentPage - 1) * perPage} />
                      <div>
                        <p className="text-[13px] font-semibold text-[#1E293B] whitespace-nowrap">{user.name}</p>
                        <p className="text-[11px] text-[#94A3B8] mt-0.5">Joined {user.joinedDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#475569] whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-4 text-[13px] text-[#475569] whitespace-nowrap">{user.phone}</td>
                  {/* Library Size — two-line */}
                  <td className="px-4 py-4">
                    <p className="text-[13px] font-semibold text-[#1E293B]">{user.libraryCount}</p>
                    <p className="text-[11px] text-[#94A3B8]">books</p>
                  </td>
                  {/* Orders — two-line */}
                  <td className="px-4 py-4">
                    <p className="text-[13px] font-semibold text-[#1E293B]">{user.orderCount}</p>
                    <p className="text-[11px] text-[#94A3B8]">orders</p>
                  </td>
                  <td className="px-4 py-4 text-[13px] font-semibold text-[#1E293B] whitespace-nowrap">₹{user.totalSpent.toLocaleString()}</td>
                  {/* Status badge */}
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#475569] whitespace-nowrap">{user.lastActive}</td>
                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-1 text-[13px] text-[#475569] hover:text-[#1E293B] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        onClick={() => setEditingUser(user)}
                        className="flex items-center gap-1 text-[13px] text-[#475569] hover:text-[#1E293B] transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: count + pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-[#E2E8F0]">
          <p className="text-[13px] text-[#64748B]">
            Showing <span className="font-semibold text-[#1E293B]">{filtered.length}</span> of <span className="font-semibold text-[#1E293B]">{users.length}</span> users
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-colors ${
                    page === currentPage
                      ? "bg-[#002045] text-white"
                      : "text-[#475569] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out] p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] flex-shrink-0">
              <div className="flex items-center gap-4">
                <Avatar name={selectedUser.name} index={users.findIndex(u => u.id === selectedUser.id)} />
                <div>
                  <h2 className="text-[18px] font-bold text-[#1E293B] flex items-center gap-2">
                    {selectedUser.name}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge[selectedUser.status]}`}>
                      {selectedUser.status}
                    </span>
                  </h2>
                  <p className="text-[13px] text-[#64748B]">Customer Profile Overview</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUser(null)} 
                className="text-2xl text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Split Content Body */}
            <div className="flex-1 overflow-y-auto py-5 grid grid-cols-1 md:grid-cols-5 gap-6">
              
              {/* Left Column: Contact & Subscription Info (span 2) */}
              <div className="md:col-span-2 space-y-5">
                
                {/* Contact Card */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Information</h4>
                  <div className="text-xs space-y-2">
                    <div>
                      <span className="text-slate-400 block">Email Address</span>
                      <span className="font-semibold text-[#1E293B] text-[13px] break-all">{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone Number</span>
                      <span className="font-semibold text-[#1E293B] text-[13px]">{selectedUser.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Member Since</span>
                      <span className="font-semibold text-[#1E293B] text-[13px]">{selectedUser.joinedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Last Session Activity</span>
                      <span className="font-semibold text-[#1E293B] text-[13px]">{selectedUser.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription & Lifetime Stats Card */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status & Lifetime Value</h4>
                  <div className="text-xs space-y-2.5">
                    <div>
                      <span className="text-slate-400 block">Subscription Status</span>
                      <span className={`inline-block px-2 py-0.5 border text-[10px] font-bold rounded-full uppercase tracking-wider mt-1 ${
                        selectedUser.subscriptionStatus.includes("Active")
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : selectedUser.subscriptionStatus === "Expired"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {selectedUser.subscriptionStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Lifetime Order Value</span>
                      <span className="font-bold text-[#1E293B] text-[16px]">₹{selectedUser.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E2E8F0] mt-1 text-center">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Orders Placed</span>
                        <span className="font-bold text-[#1E293B] text-sm">{selectedUser.orderCount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Library Size</span>
                        <span className="font-bold text-[#1E293B] text-sm">{selectedUser.libraryCount} books</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Purchase History (span 3) */}
              <div className="md:col-span-3 flex flex-col space-y-3.5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">Purchase History</h4>
                
                <div className="flex-1 border border-[#E2E8F0] rounded-xl overflow-hidden bg-white flex flex-col">
                  {selectedUser.purchaseHistory.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 text-xs italic">
                      No purchases logged for this account.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#F1F5F9] overflow-y-auto max-h-[300px]">
                      {selectedUser.purchaseHistory.map((item) => (
                        <div key={item.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors">
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-[#1E293B] truncate">{item.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Order ID: {item.id} • Date: {item.date}</p>
                          </div>
                          <div className="text-right flex-shrink-0 flex flex-col items-end">
                            <p className="font-bold text-xs text-[#1E293B]">₹{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => setInvoicePreviewOrder({
                                  id: item.id,
                                  orderNumber: item.id,
                                  customer: selectedUser.name,
                                  customerEmail: selectedUser.email,
                                  createdAt: item.date,
                                  total: item.price,
                                  orderType: item.type === "Digital" ? "digital" : "physical",
                                  orderItems: [{ bookTitle: item.title, language: "English", format: item.type === "Digital" ? "digital" : "physical", quantity: 1, price: item.price }]
                                })}
                                className="text-[10px] text-indigo-600 hover:text-indigo-800 hover:underline border-none bg-transparent cursor-pointer font-bold"
                              >
                                View Invoice
                              </button>
                              <span className={`inline-block text-[9px] font-bold px-1.5 py-0.25 rounded uppercase tracking-wider ${
                                item.type === "Digital" 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "bg-orange-50 text-orange-700 border border-orange-100"
                              }`}>
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0] flex-shrink-0">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] text-[13px] font-medium text-[#475569] transition-colors cursor-pointer bg-white">
                <RotateCcw className="w-4 h-4" />
                Reset Password
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2.5 bg-[#002045] text-white rounded-lg text-[13px] font-semibold hover:bg-[#001b3c] transition-colors cursor-pointer border-none"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
              addAuditLog("Users", `Updated customer profile for "${editingUser.name}" (Email: ${editingUser.email}, Status: ${editingUser.status}, Subscription: ${editingUser.subscriptionStatus})`, "info");
              setEditingUser(null);
            }}
            className="bg-white border border-[#E2E8F0] rounded-xl p-8 w-full max-w-lg shadow-xl"
          >
            <h2 className="text-[18px] font-semibold text-[#1E293B] mb-6 pb-5 border-b border-[#E2E8F0]">Edit User Profile</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/40 focus:ring-2 focus:ring-[#002045]/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/40 focus:ring-2 focus:ring-[#002045]/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={editingUser.phone}
                  onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/40 focus:ring-2 focus:ring-[#002045]/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Account Status</label>
                  <select
                    value={editingUser.status}
                    onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/40 focus:ring-2 focus:ring-[#002045]/10 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Subscription Status</label>
                  <select
                    value={editingUser.subscriptionStatus}
                    onChange={e => setEditingUser({ ...editingUser, subscriptionStatus: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/40 focus:ring-2 focus:ring-[#002045]/10 cursor-pointer"
                  >
                    <option value="None">None</option>
                    <option value="Basic Active">Basic Active</option>
                    <option value="Premium Active">Premium Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="flex-1 px-4 py-2.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] text-[13px] font-medium text-[#475569] transition-colors cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#002045] text-white rounded-lg text-[13px] font-semibold hover:bg-[#001b3c] transition-colors cursor-pointer border-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {invoicePreviewOrder && (
        <InvoiceModal
          order={invoicePreviewOrder}
          onClose={() => setInvoicePreviewOrder(null)}
        />
      )}
    </div>
  );
}
