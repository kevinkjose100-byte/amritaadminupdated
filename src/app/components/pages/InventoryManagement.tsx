import React, { useState, useEffect } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, Search, Edit, X, Download } from "lucide-react";
import { MetricCard } from "../MetricCard";
import { addAuditLog } from "../../utils/auditLogStore";

type InventoryItem = {
  sku: string;
  title: string;
  language: string;
  stock: number;
  lowStockThreshold: number;
  weight: number;
};

const mockInventory: InventoryItem[] = [
  {
    sku: "BG-HI-001",
    title: "Bhagavad Gita",
    language: "Hindi",
    stock: 12,
    lowStockThreshold: 15,
    weight: 450,
  },
  {
    sku: "BG-TA-001",
    title: "Bhagavad Gita",
    language: "Tamil",
    stock: 28,
    lowStockThreshold: 15,
    weight: 450,
  },
  {
    sku: "UP-TA-001",
    title: "Upanishads Collection",
    language: "Tamil",
    stock: 8,
    lowStockThreshold: 15,
    weight: 680,
  },
  {
    sku: "RM-HI-001",
    title: "Ramayana",
    language: "Hindi",
    stock: 45,
    lowStockThreshold: 20,
    weight: 520,
  },
  {
    sku: "MB-TE-001",
    title: "Mahabharata",
    language: "Telugu",
    stock: 6,
    lowStockThreshold: 10,
    weight: 890,
  },
];

const migrateItem = (item: any): InventoryItem => {
  if (item.locationStock) {
    const sum =
      (item.locationStock.amritapuri || 0) +
      (item.locationStock.bangalore || 0) +
      (item.locationStock.branchAshrams || 0) +
      (item.locationStock.exhibitionStalls || 0) +
      (item.locationStock.warehouses || 0);
    return {
      sku: item.sku,
      title: item.title,
      language: item.language,
      stock: sum,
      lowStockThreshold: Number(item.lowStockThreshold) || 15,
      weight: Number(item.weight) || 450,
    };
  }
  return {
    sku: item.sku,
    title: item.title,
    language: item.language,
    stock: Number(item.stock) || 0,
    lowStockThreshold: Number(item.lowStockThreshold) || 15,
    weight: Number(item.weight) || 450,
  };
};

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem("amrita_inventory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(migrateItem);
        }
      } catch (e) {
        console.error("Error parsing amrita_inventory", e);
      }
    }
    const initial = mockInventory.map(migrateItem);
    localStorage.setItem("amrita_inventory", JSON.stringify(initial));
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("amrita_inventory", JSON.stringify(inventory));
  }, [inventory]);

  const [alertsOpen, setAlertsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const languages = Array.from(new Set(inventory.map(item => item.language)));

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [editStock, setEditStock] = useState(0);
  const [editThreshold, setEditThreshold] = useState(0);

  const handleStartEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setEditStock(item.stock);
    setEditThreshold(item.lowStockThreshold);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setInventory(prev => prev.map(item => {
      if (item.sku === editingItem.sku) {
        addAuditLog(
          "Inventory",
          `Updated stock levels for "${item.title}" (${item.language}) SKU ${item.sku}: Stock changed from ${item.stock} to ${editStock}, Low stock threshold set to ${editThreshold}`,
          "info"
        );
        return {
          ...item,
          stock: editStock,
          lowStockThreshold: editThreshold
        };
      }
      return item;
    }));
    setEditingItem(null);
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === "All" || item.language === languageFilter;
    
    const isLowStock = item.stock <= item.lowStockThreshold;
    
    const matchesStatus = statusFilter === "All" || 
                          (statusFilter === "low" && isLowStock) || 
                          (statusFilter === "instock" && !isLowStock);

    return matchesSearch && matchesLanguage && matchesStatus;
  });

  const lowStockItems = inventory
    .filter(item => item.stock <= item.lowStockThreshold)
    .sort((a, b) => {
      const ratioA = a.stock / a.lowStockThreshold;
      const ratioB = b.stock / b.lowStockThreshold;
      return ratioA - ratioB;
    });

  const totalStockValue = inventory.reduce((sum, item) => sum + item.stock, 0);

  const urgencyLabel = (item: InventoryItem) => {
    const ratio = item.stock / item.lowStockThreshold;
    if (ratio <= 0.4) return { label: "Critical", cls: "bg-[#FEE2E2] text-[#B91C1C] rounded-full px-2.5 py-0.5 text-[11px] font-semibold " };
    return { label: "Low", cls: "bg-[#FEF3C7] text-[#92400E] rounded-full px-2.5 py-0.5 text-[11px] font-semibold " };
  };

  const handleExportCSV = () => {
    if (filteredInventory.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["SKU", "Title", "Language", "Stock", "Low Stock Threshold", "Weight (g)"];
    const rows = filteredInventory.map(item => [
      item.sku,
      item.title,
      item.language,
      item.stock,
      item.lowStockThreshold,
      item.weight
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `filtered_inventory_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Inventory Management</h1>
        <p className="text-sm text-[#43474e] font-normal leading-5">Track physical stock levels and manage SKUs</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <MetricCard
          label="Total Items"
          value={inventory.length}
          iconPaths={[
            { d: "M11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73Z", stroke: "#002045" },
            { d: "M12 22V12", stroke: "#002045" },
            { d: "M3.29 7L12 12L20.71 7", stroke: "#002045" },
            { d: "M7.5 4.27L16.5 9.42", stroke: "#002045" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(0,32,69,0.12) 0%, rgba(0,32,69,0.04) 100%)"
          subtitle="SKUs tracked"
        />
        <MetricCard
          label="Total Stock"
          value={totalStockValue}
          iconPaths={[
            { d: "M3 3H21", stroke: "#002045" },
            { d: "M3 3V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V3", stroke: "#002045" },
            { d: "M9 9H15", stroke: "#002045" },
            { d: "M9 13H15", stroke: "#002045" },
            { d: "M9 17H12", stroke: "#002045" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(0,32,69,0.12) 0%, rgba(0,32,69,0.04) 100%)"
          subtitle="Units available"
        />
        <MetricCard
          label="Low Stock Alerts"
          value={lowStockItems.length}
          iconPaths={[
            { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", stroke: "#BA1A1A" },
            { d: "M12 9V13", stroke: "#BA1A1A" },
            { d: "M12 17H12.01", stroke: "#BA1A1A" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(186,26,26,0.12) 0%, rgba(186,26,26,0.04) 100%)"
          subtitle="Items need restocking"
          valueColor="#BA1A1A"
        />
      </div>

      {lowStockItems.length > 0 && (
        <div className="border border-destructive/20 rounded-lg overflow-hidden">
          {/* Collapsible header */}
          <button
            onClick={() => setAlertsOpen(v => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-destructive/8 hover:bg-destructive/12 transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-sm font-semibold text-destructive">
                Low Stock Alerts
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 bg-destructive text-white rounded-full">{lowStockItems.length}</span>
            </div>
            {alertsOpen ? <ChevronUp className="w-4 h-4 text-destructive/70" /> : <ChevronDown className="w-4 h-4 text-destructive/70" />}
          </button>

          {/* Compressed alert rows */}
          {alertsOpen && (
            <div className="divide-y divide-destructive/10 bg-destructive/5">
              {lowStockItems.map((item) => {
                const { label, cls } = urgencyLabel(item);
                return (
                  <div key={item.sku} className="flex items-center justify-between px-4 py-2.5 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`whitespace-nowrap flex-shrink-0 ${cls}`}>{label}</span>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <span className="text-sm text-muted-foreground"> ({item.language})</span>
                        <span className="text-xs text-muted-foreground ml-2">· SKU: {item.sku}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-semibold text-destructive">Only {item.stock} left</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        / {item.lowStockThreshold} threshold
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="bg-card border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card">
          <div>
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">All Inventory Items</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Filter and search current catalog stock levels.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px] flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by book name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-[#191c1e] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] transition-all"
              />
            </div>

            {/* Language Filter */}
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 cursor-pointer"
            >
              <option value="All">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Stock Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="instock">In Stock Only</option>
              <option value="low">Low Stock Only</option>
            </select>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg text-xs font-bold transition-all bg-white cursor-pointer text-[#191c1e]"
              title="Export filtered inventory to CSV"
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
                <th className="px-6 py-4 whitespace-nowrap">SKU</th>
                <th className="px-6 py-4 whitespace-nowrap">Title</th>
                <th className="px-6 py-4 whitespace-nowrap">Language</th>
                <th className="px-6 py-4 whitespace-nowrap">Stock & Threshold</th>
                <th className="px-6 py-4 whitespace-nowrap">Weight (g)</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground italic bg-card">
                    No inventory items found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const isLow = item.stock <= item.lowStockThreshold;
                  return (
                    <React.Fragment key={item.sku}>
                      <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all group">
                        <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-foreground">
                          <span>{item.sku}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{item.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-[var(--color-neutral-100)] border border-border rounded-full text-xs font-semibold text-foreground">{item.language}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className={`font-semibold text-sm ${isLow ? "text-destructive font-bold" : "text-foreground"}`}>
                              {item.stock} units
                            </span>
                            <span className="text-[10px] text-muted-foreground">Threshold: {item.lowStockThreshold}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{item.weight}g</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isLow ? (
                            <span className="bg-[#FEE2E2] text-[#B91C1C] rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                              Low Stock
                            </span>
                          ) : (
                            <span className="bg-[#DCFCE7] text-[#15803D] rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-[var(--color-saffron)] rounded-lg transition-colors inline-flex items-center gap-1.5 text-xs font-semibold border border-transparent hover:border-border cursor-pointer bg-transparent"
                            title="Adjust Stock & Threshold"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Adjust
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock & Threshold Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <Edit className="w-5 h-5 text-[var(--color-saffron)]" />
                Adjust Stock & Threshold
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 hover:bg-muted rounded-lg border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Adjust levels for item:</p>
              <h4 className="font-bold text-sm text-foreground mt-0.5">{editingItem.title}</h4>
              <p className="text-xs font-mono text-muted-foreground">SKU: {editingItem.sku} · {editingItem.language}</p>
            </div>

            {/* Stock Adjustment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-foreground">Current Stock</label>
                <span className="text-[10px] text-muted-foreground italic">Total available inventory</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditStock(prev => Math.max(0, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-border flex items-center justify-center font-bold text-lg text-foreground cursor-pointer transition-all active:scale-95"
                >
                  -
                </button>
                <input
                  type="number"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 text-center py-2 border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] text-foreground bg-background"
                  min="0"
                />
                <button
                  type="button"
                  onClick={() => setEditStock(prev => prev + 1)}
                  className="w-10 h-10 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-border flex items-center justify-center font-bold text-lg text-foreground cursor-pointer transition-all active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Threshold Field */}
            <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-foreground">Low Stock Threshold</label>
                <span className="text-[10px] text-muted-foreground italic">Alerts trigger at or below this value</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditThreshold(prev => Math.max(0, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-border flex items-center justify-center font-bold text-lg text-foreground cursor-pointer transition-all active:scale-95"
                >
                  -
                </button>
                <input
                  type="number"
                  required
                  value={editThreshold}
                  onChange={(e) => setEditThreshold(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 text-center py-2 border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]/20 focus:border-[var(--color-saffron)] text-foreground bg-background"
                  min="0"
                />
                <button
                  type="button"
                  onClick={() => setEditThreshold(prev => prev + 1)}
                  className="w-10 h-10 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-border flex items-center justify-center font-bold text-lg text-foreground cursor-pointer transition-all active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-foreground transition-all cursor-pointer bg-card"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer border-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
