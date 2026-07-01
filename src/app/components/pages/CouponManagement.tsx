import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, Tag, Percent, Calendar, Users, AlertCircle, Download } from "lucide-react";
import { MetricCard } from "../MetricCard";

type Coupon = {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  usageLimitPerCustomer: number; // 0 means unlimited
  timesUsed: number;
  status: "Active" | "Inactive";
  applicableOrderType: "all" | "physical" | "digital";
  createdAt: string;
};

const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "AMRITA20",
    description: "20% off site-wide on all spiritual literatures",
    discountType: "percentage",
    discountValue: 20,
    expiryDate: "2026-12-31",
    usageLimitPerCustomer: 1,
    timesUsed: 42,
    status: "Active",
    applicableOrderType: "all",
    createdAt: "2026-01-01"
  },
  {
    id: "2",
    code: "AMMABDAY2026",
    description: "Special 20% discount in honor of Amma's Birthday Celebrations",
    discountType: "percentage",
    discountValue: 20,
    expiryDate: "2026-09-30",
    usageLimitPerCustomer: 1,
    timesUsed: 89,
    status: "Active",
    applicableOrderType: "physical",
    createdAt: "2026-05-10"
  },
  {
    id: "3",
    code: "CHILDREN15",
    description: "15% off on Balakendra and children story books",
    discountType: "percentage",
    discountValue: 15,
    expiryDate: "2026-08-15",
    usageLimitPerCustomer: 3,
    timesUsed: 15,
    status: "Active",
    applicableOrderType: "all",
    createdAt: "2026-06-01"
  },
  {
    id: "4",
    code: "WELCOME100",
    description: "₹100 flat discount for first-time store registrations",
    discountType: "fixed",
    discountValue: 100,
    expiryDate: "2026-12-31",
    usageLimitPerCustomer: 1,
    timesUsed: 215,
    status: "Active",
    applicableOrderType: "digital",
    createdAt: "2026-01-15"
  }
];

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem("amrita_coupons");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing amrita_coupons", e);
      }
    }
    localStorage.setItem("amrita_coupons", JSON.stringify(initialCoupons));
    return initialCoupons;
  });

  useEffect(() => {
    localStorage.setItem("amrita_coupons", JSON.stringify(coupons));
  }, [coupons]);

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form states
  const [formCode, setFormCode] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formType, setFormType] = useState<"percentage" | "fixed">("percentage");
  const [formValue, setFormValue] = useState("");
  const [formExpiry, setFormExpiry] = useState("");
  const [formUsageLimit, setFormUsageLimit] = useState("1"); // string to map easily
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");
  const [formOrderType, setFormOrderType] = useState<"all" | "physical" | "digital">("all");

  // Filtering
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || coupon.status === statusFilter;
    const matchesType = typeFilter === "All" || coupon.discountType === typeFilter;
    const matchesOrderType = orderTypeFilter === "All" || coupon.applicableOrderType === orderTypeFilter;
    return matchesSearch && matchesStatus && matchesType && matchesOrderType;
  });

  // Analytics
  const activeCount = coupons.filter(c => c.status === "Active").length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + c.timesUsed, 0);
  
  // Savings estimation: assume average purchase saves ₹150 for fixed, or percentage savings
  const estimatedSavings = coupons.reduce((sum, c) => {
    if (c.discountType === "fixed") {
      return sum + (c.discountValue * c.timesUsed);
    } else {
      return sum + (c.discountValue * 2.5 * c.timesUsed); // average order ₹500, saves Value * 5 per redemption
    }
  }, 0);

  // Expiry check helper
  const getExpiryStatus = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(dateStr);
    expiry.setHours(0, 0, 0, 0);
    
    if (expiry < today) {
      return { label: "Expired", cls: "bg-red-100 text-red-700 border-red-200" };
    }
    
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return { label: `Expires in ${diffDays}d`, cls: "bg-amber-100 text-amber-700 border-amber-200" };
    }
    
    return { label: `Active (Expires ${dateStr})`, cls: "bg-slate-100 text-slate-700 border-slate-200" };
  };

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setFormCode("");
    setFormDesc("");
    setFormType("percentage");
    setFormValue("");
    setFormExpiry("");
    setFormUsageLimit("1");
    setFormStatus("Active");
    setFormOrderType("all");
    setShowModal(true);
  };

  const handleOpenEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormCode(coupon.code);
    setFormDesc(coupon.description);
    setFormType(coupon.discountType);
    setFormValue(String(coupon.discountValue));
    setFormExpiry(coupon.expiryDate);
    setFormUsageLimit(String(coupon.usageLimitPerCustomer));
    setFormStatus(coupon.status);
    setFormOrderType(coupon.applicableOrderType || "all");
    setShowModal(true);
  };

  const handleToggleStatus = (id: string) => {
    setCoupons(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === "Active" ? "Inactive" : "Active";
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formValue.trim() || !formExpiry) {
      alert("Please fill in all required fields.");
      return;
    }

    const cleanCode = formCode.toUpperCase().replace(/\s+/g, "");

    // Check duplicate code (excluding current editing item)
    const isDuplicate = coupons.some(c => c.code === cleanCode && (!editingCoupon || c.id !== editingCoupon.id));
    if (isDuplicate) {
      alert(`Coupon code "${cleanCode}" already exists.`);
      return;
    }

    if (editingCoupon) {
      // Edit mode
      setCoupons(prev => prev.map(c => {
        if (c.id === editingCoupon.id) {
          return {
            ...c,
            code: cleanCode,
            description: formDesc,
            discountType: formType,
            discountValue: parseFloat(formValue) || 0,
            expiryDate: formExpiry,
            usageLimitPerCustomer: parseInt(formUsageLimit) || 0,
            status: formStatus,
            applicableOrderType: formOrderType
          };
        }
        return c;
      }));
    } else {
      // Create mode
      const newCoupon: Coupon = {
        id: String(coupons.length + 1 + Date.now()),
        code: cleanCode,
        description: formDesc,
        discountType: formType,
        discountValue: parseFloat(formValue) || 0,
        expiryDate: formExpiry,
        usageLimitPerCustomer: parseInt(formUsageLimit) || 0,
        timesUsed: 0,
        status: formStatus,
        applicableOrderType: formOrderType,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setCoupons([newCoupon, ...coupons]);
    }

    setShowModal(false);
  };

  const handleExportCSV = () => {
    if (filteredCoupons.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Coupon Code", "Description", "Discount Type", "Discount Value", "Usage Limit", "Times Used", "Expiry Date", "Order Type Restriction", "Status"];
    const rows = filteredCoupons.map(coupon => [
      coupon.code,
      coupon.description || "",
      coupon.discountType,
      coupon.discountValue,
      coupon.usageLimitPerCustomer === 0 ? "Unlimited" : coupon.usageLimitPerCustomer,
      coupon.timesUsed,
      coupon.expiryDate,
      coupon.applicableOrderType || "all",
      coupon.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `filtered_coupons_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      {/* Page Header */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Coupon & Promo Code Console</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </button>
        </div>
        <p className="text-sm text-[#43474e] font-normal leading-5">Create promotional codes, configure customer usage limits, set expiry schedules, and track redemption analytics.</p>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Total Promo Codes"
          value={coupons.length}
          iconPaths={[]}
          showIcon={false}
          subtitle="Campaigns created"
        />
        <MetricCard
          label="Active Campaigns"
          value={activeCount}
          iconPaths={[]}
          showIcon={false}
          subtitle="Redeemable codes"
          valueColor="#15803D"
        />
        <MetricCard
          label="Total Redemptions"
          value={totalRedemptions}
          iconPaths={[]}
          showIcon={false}
          subtitle="Redeemed by readers"
          valueColor="#002045"
        />
        <MetricCard
          label="Estimated Saved"
          value={`₹${estimatedSavings.toLocaleString()}`}
          iconPaths={[]}
          showIcon={false}
          subtitle="Discounts passed to customers"
          valueColor="#15803D"
        />
      </div>

      {/* Coupon List Container */}
      <div className="bg-card border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card">
          <div>
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Promo Campaigns</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Search and edit active discount triggers.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[220px] flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-[#191c1e] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] transition-all"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="percentage">Percentage Discount (%)</option>
              <option value="fixed">Fixed Amount Discount</option>
            </select>

            {/* Order Type Filter */}
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 cursor-pointer"
            >
              <option value="All">All Order Types</option>
              <option value="all">All Orders (Universal)</option>
              <option value="physical">Physical Orders Only</option>
              <option value="digital">Digital Orders Only</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg text-xs font-bold transition-all bg-white cursor-pointer text-[#191c1e]"
              title="Export filtered coupons to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Coupon Code</th>
                <th className="px-6 py-4 whitespace-nowrap">Discount Value</th>
                <th className="px-6 py-4 whitespace-nowrap">Usage Limit Per User</th>
                <th className="px-6 py-4 whitespace-nowrap">Times Redeemed</th>
                <th className="px-6 py-4 whitespace-nowrap">Expiry Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground italic bg-card">
                    No coupon codes found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const expiry = getExpiryStatus(coupon.expiryDate);
                  return (
                    <tr key={coupon.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground text-sm flex items-center gap-1.5 font-mono">
                            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                            {coupon.code}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                              coupon.applicableOrderType === "physical" ? "bg-amber-50 border-amber-200 text-amber-800" :
                              coupon.applicableOrderType === "digital" ? "bg-blue-50 border-blue-200 text-blue-800" :
                              "bg-slate-50 border-slate-200 text-slate-700"
                            }`}>
                              {coupon.applicableOrderType === "physical" ? "Physical Only" :
                               coupon.applicableOrderType === "digital" ? "Digital Only" :
                               "All Orders"}
                            </span>
                            {coupon.description && (
                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">{coupon.description}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-foreground text-sm flex items-center gap-1">
                          {coupon.discountType === "percentage" ? (
                            <>
                              <Percent className="w-3.5 h-3.5 text-emerald-600" />
                              {coupon.discountValue}% Off
                            </>
                          ) : (
                            <>
                              ₹{coupon.discountValue.toLocaleString()} Off
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-foreground text-xs flex items-center gap-1 bg-[#F1F5F9] px-2 py-0.5 rounded border border-border">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          {coupon.usageLimitPerCustomer === 0 ? "Unlimited" : `${coupon.usageLimitPerCustomer} time(s)`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#002045]">
                        {coupon.timesUsed} uses
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block border text-[11px] font-semibold px-2 py-0.5 rounded-full ${expiry.cls}`}>
                          {expiry.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* Toggle switch */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(coupon.id)}
                            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer outline-none border-none p-0 flex items-center ${
                              coupon.status === "Active" ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 bg-white rounded-full transition-transform absolute shadow-sm ${
                              coupon.status === "Active" ? "translate-x-5.5" : "translate-x-1"
                            }`} />
                          </button>
                          <span className={`text-xs font-semibold ${coupon.status === "Active" ? "text-emerald-700" : "text-muted-foreground"}`}>
                            {coupon.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(coupon)}
                            className="p-1.5 text-slate-500 hover:text-[var(--color-saffron)] hover:bg-slate-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                            title="Edit Campaign"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(coupon.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                            title="Delete Code"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <Tag className="w-5 h-5 text-[var(--color-saffron)]" />
                {editingCoupon ? "Modify Promo Campaign" : "Configure New Coupon"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-muted rounded-lg border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            {/* Code */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-foreground">Promo Code</label>
              <input
                type="text"
                required
                value={formCode}
                onChange={(e) => setFormCode(e.target.value)}
                placeholder="e.g. FESTIVE20"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] font-mono uppercase font-bold"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Codes are automatically capitalized and spaces are stripped.</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-foreground">Description / Campaign Purpose</label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="e.g. 20% discount on cart value above ₹499"
                rows={2}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] resize-none"
              />
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-foreground">Discount Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Value (₹/$)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-foreground">Discount Value</label>
                <input
                  type="number"
                  required
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder={formType === "percentage" ? "e.g. 20" : "e.g. 100"}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)]"
                  min="1"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Expiry Date
              </label>
              <input
                type="date"
                required
                value={formExpiry}
                onChange={(e) => setFormExpiry(e.target.value)}
                className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
              />
            </div>

            {/* Usage Limit per Customer */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-foreground flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                Usage Limit per Customer
              </label>
              <select
                value={formUsageLimit}
                onChange={(e) => setFormUsageLimit(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
              >
                <option value="0">Unlimited Uses</option>
                <option value="1">1 Use Per Customer</option>
                <option value="3">3 Uses Per Customer</option>
                <option value="5">5 Uses Per Customer</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">Prevents accounts from claiming the coupon multiple times.</p>
            </div>

            {/* Applicable Order Type */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Applicable Order Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="orderType"
                    checked={formOrderType === "all"}
                    onChange={() => setFormOrderType("all")}
                    className="w-4 h-4 border-border text-[var(--color-saffron)]"
                  />
                  All Orders
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="orderType"
                    checked={formOrderType === "physical"}
                    onChange={() => setFormOrderType("physical")}
                    className="w-4 h-4 border-border text-[var(--color-saffron)]"
                  />
                  Physical Only
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="orderType"
                    checked={formOrderType === "digital"}
                    onChange={() => setFormOrderType("digital")}
                    className="w-4 h-4 border-border text-[var(--color-saffron)]"
                  />
                  Digital Only
                </label>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <label className="block text-sm font-semibold text-foreground">Campaign Status</label>
                <p className="text-[10px] text-muted-foreground">Deactivated coupons cannot be applied at checkout.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormStatus(prev => prev === "Active" ? "Inactive" : "Active")}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer outline-none border-none p-0 flex items-center ${
                    formStatus === "Active" ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full transition-transform absolute shadow-sm ${
                    formStatus === "Active" ? "translate-x-5.5" : "translate-x-1"
                  }`} />
                </button>
                <span className={`text-xs font-semibold ${formStatus === "Active" ? "text-emerald-700" : "text-muted-foreground"}`}>
                  {formStatus}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-foreground transition-all cursor-pointer bg-card"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-sm border-none cursor-pointer"
              >
                Save Coupon
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
