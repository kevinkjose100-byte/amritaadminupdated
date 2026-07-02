import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Archive, 
  ArrowUpRight, 
  ArrowDownRight, 
  Loader2, 
  Search, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";
import logo from "../../../imports/image.png";
import { MetricCard } from "../MetricCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  LineChart,
  Line
} from "recharts";

// Interfaces
interface SaleItem {
  id: string;
  date: string;
  sku: string;
  title: string;
  category: "Spiritual" | "Stories" | "Philosophy" | "Biography";
  language: "English" | "Malayalam" | "Hindi" | "Tamil" | "Telugu";
  channel: "online" | "physical" | "manual";
  quantity: number;
  revenue: number;
}

interface SubscriptionReportItem {
  id: string;
  subscriberName: string;
  dateJoined: string;
  expiryDate: string;
  status: "Active" | "Expired";
  renewed: boolean;
  amount: number;
}

// Mock Sales Database
const mockSales: SaleItem[] = [
  // June 2026
  { id: "1", date: "2026-06-24", sku: "BG-HI-001", title: "Bhagavad Gita", category: "Spiritual", language: "Hindi", channel: "online", quantity: 3, revenue: 1350 },
  { id: "2", date: "2026-06-23", sku: "BG-TA-001", title: "Bhagavad Gita", category: "Spiritual", language: "Tamil", channel: "physical", quantity: 5, revenue: 2250 },
  { id: "3", date: "2026-06-22", sku: "UP-TA-001", title: "Upanishads Collection", category: "Spiritual", language: "Tamil", channel: "manual", quantity: 1, revenue: 680 },
  { id: "4", date: "2026-06-21", sku: "RM-HI-001", title: "Ramayana", category: "Spiritual", language: "Hindi", channel: "online", quantity: 4, revenue: 2080 },
  { id: "5", date: "2026-06-20", sku: "MB-TE-001", title: "Mahabharata", category: "Spiritual", language: "Telugu", channel: "online", quantity: 2, revenue: 1780 },
  { id: "6", date: "2026-06-18", sku: "BG-HI-001", title: "Bhagavad Gita", category: "Spiritual", language: "Hindi", channel: "physical", quantity: 2, revenue: 900 },
  { id: "7", date: "2026-06-15", sku: "RM-HI-001", title: "Ramayana", category: "Spiritual", language: "Hindi", channel: "manual", quantity: 1, revenue: 520 },
  { id: "8", date: "2026-06-12", sku: "BG-TA-001", title: "Bhagavad Gita", category: "Spiritual", language: "Tamil", quantity: 8, revenue: 3600, channel: "online" },
  { id: "9", date: "2026-06-10", sku: "UP-TA-001", title: "Upanishads Collection", category: "Spiritual", language: "Tamil", channel: "physical", quantity: 2, revenue: 1360 },
  { id: "10", date: "2026-06-05", sku: "BG-HI-001", title: "Bhagavad Gita", category: "Spiritual", language: "Hindi", channel: "online", quantity: 5, revenue: 2250 },
  // May 2026
  { id: "11", date: "2026-05-28", sku: "RM-HI-001", title: "Ramayana", category: "Spiritual", language: "Hindi", channel: "online", quantity: 10, revenue: 5200 },
  { id: "12", date: "2026-05-25", sku: "BG-TA-001", title: "Bhagavad Gita", category: "Spiritual", language: "Tamil", channel: "physical", quantity: 12, revenue: 5400 },
  { id: "13", date: "2026-05-20", sku: "MB-TE-001", title: "Mahabharata", category: "Spiritual", language: "Telugu", channel: "manual", quantity: 3, revenue: 2670 },
  { id: "14", date: "2026-05-15", sku: "UP-TA-001", title: "Upanishads Collection", category: "Spiritual", language: "Tamil", channel: "online", quantity: 4, revenue: 2720 },
  { id: "15", date: "2026-05-10", sku: "BG-HI-001", title: "Bhagavad Gita", category: "Spiritual", language: "Hindi", channel: "physical", quantity: 8, revenue: 3600 },
  { id: "16", date: "2026-05-02", sku: "RM-HI-001", title: "Ramayana", category: "Spiritual", language: "Hindi", channel: "online", quantity: 6, revenue: 3120 },
  // April 2026
  { id: "17", date: "2026-04-28", sku: "BG-HI-001", title: "Bhagavad Gita", category: "Spiritual", language: "Hindi", channel: "online", quantity: 15, revenue: 6750 },
  { id: "18", date: "2026-04-20", sku: "BG-TA-001", title: "Bhagavad Gita", category: "Spiritual", language: "Tamil", channel: "physical", quantity: 18, revenue: 8100 },
  { id: "19", date: "2026-04-15", sku: "RM-HI-001", title: "Ramayana", category: "Spiritual", language: "Hindi", channel: "online", quantity: 12, revenue: 6240 },
  { id: "20", date: "2026-04-05", sku: "MB-TE-001", title: "Mahabharata", category: "Spiritual", language: "Telugu", channel: "manual", quantity: 4, revenue: 3560 }
];

// Mock Subscriptions
const mockSubscriptions: SubscriptionReportItem[] = [
  { id: "sub-1", subscriberName: "Rajesh Kumar", dateJoined: "2026-01-10", expiryDate: "2026-07-10", status: "Active", renewed: true, amount: 2450 },
  { id: "sub-2", subscriberName: "Priya Sharma", dateJoined: "2026-02-15", expiryDate: "2026-08-15", status: "Active", renewed: false, amount: 850 },
  { id: "sub-3", subscriberName: "Aravind Nair", dateJoined: "2025-06-20", expiryDate: "2026-06-20", status: "Expired", renewed: false, amount: 2450 },
  { id: "sub-4", subscriberName: "Meera Pillai", dateJoined: "2026-05-01", expiryDate: "2027-05-01", status: "Active", renewed: true, amount: 2450 },
  { id: "sub-5", subscriberName: "Devendra Verma", dateJoined: "2026-03-12", expiryDate: "2026-09-12", status: "Active", renewed: false, amount: 850 },
  { id: "sub-6", subscriberName: "Sanjay Menon", dateJoined: "2025-12-05", expiryDate: "2026-06-05", status: "Expired", renewed: true, amount: 2450 },
  { id: "sub-7", subscriberName: "Anjali Nair", dateJoined: "2026-06-18", expiryDate: "2026-12-18", status: "Active", renewed: false, amount: 850 }
];

export function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState<"sales" | "subscriptions" | "inventory">("sales");

  // Date Range States
  const [datePreset, setDatePreset] = useState<"7d" | "30d" | "thisMonth" | "lastMonth" | "custom">("30d");
  const [startDate, setStartDate] = useState("2026-05-25");
  const [endDate, setEndDate] = useState("2026-06-25");

  // Export Loading States
  const [exportingType, setExportingType] = useState<"pdf" | "excel" | "csv" | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  // Print All Invoices States
  const [isPrintingAll, setIsPrintingAll] = useState(false);
  const [printOrders, setPrintOrders] = useState<any[]>([]);

  const handleExportAllInvoices = () => {
    const savedOrders = localStorage.getItem("amrita_orders");
    let ordersList = [];
    if (savedOrders) {
      try {
        ordersList = JSON.parse(savedOrders);
      } catch (e) {}
    }
    if (ordersList.length === 0) {
      ordersList = [
        { id: "1", orderNumber: "AB-2026-8942", customer: "Rajesh Kumar", customerEmail: "rajesh.kumar@example.com", createdAt: "2026-06-24", total: 1350, orderType: "physical", orderItems: [{ bookTitle: "Bhagavad Gita", language: "Hindi", format: "physical", quantity: 3, price: 450 }] },
        { id: "2", orderNumber: "AB-2026-8941", customer: "Priya Sharma", customerEmail: "priya.sharma@example.com", createdAt: "2026-06-23", total: 2250, orderType: "physical", orderItems: [{ bookTitle: "Bhagavad Gita", language: "Tamil", format: "physical", quantity: 5, price: 450 }] },
        { id: "3", orderNumber: "AB-2026-8940", customer: "Amit Patel", customerEmail: "amit.patel@example.com", createdAt: "2026-06-22", total: 680, orderType: "physical", orderItems: [{ bookTitle: "Upanishads Collection", language: "Tamil", format: "physical", quantity: 1, price: 680 }] }
      ];
    }
    setPrintOrders(ordersList);
    setIsPrintingAll(true);
  };

  useEffect(() => {
    if (isPrintingAll && printOrders.length > 0) {
      const timer = setTimeout(() => {
        window.print();
        setIsPrintingAll(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPrintingAll, printOrders]);

  // Set date ranges automatically based on presets
  useEffect(() => {
    const today = new Date("2026-06-25"); // Anchor to our mock environment timeframe
    
    if (datePreset === "7d") {
      const past = new Date(today);
      past.setDate(today.getDate() - 7);
      setStartDate(past.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    } else if (datePreset === "30d") {
      const past = new Date(today);
      past.setDate(today.getDate() - 30);
      setStartDate(past.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    } else if (datePreset === "thisMonth") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    } else if (datePreset === "lastMonth") {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(lastDay.toISOString().split("T")[0]);
    }
  }, [datePreset]);

  // Filtering lists by date range
  const filteredSales = mockSales.filter(item => {
    return item.date >= startDate && item.date <= endDate;
  });

  const filteredSubscriptions = mockSubscriptions.filter(item => {
    // Treat dateJoined or expiryDate as the range check depending on what we track. Let's use expiryDate for subscription expiries
    return item.expiryDate >= startDate && item.expiryDate <= endDate;
  });

  // Sales computations
  const totalRevenue = filteredSales.reduce((sum, item) => sum + item.revenue, 0);
  const totalSalesCount = filteredSales.reduce((sum, item) => sum + item.quantity, 0);
  const averageOrderValue = filteredSales.length > 0 ? Math.round(totalRevenue / filteredSales.length) : 0;

  // Channel Splits
  const onlineSalesVal = filteredSales.filter(c => c.channel === "online").reduce((sum, item) => sum + item.revenue, 0);
  const physicalSalesVal = filteredSales.filter(c => c.channel === "physical").reduce((sum, item) => sum + item.revenue, 0);
  const manualSalesVal = filteredSales.filter(c => c.channel === "manual").reduce((sum, item) => sum + item.revenue, 0);

  const salesByChannelData = [
    { name: "Online Sales", value: onlineSalesVal, color: "#002045" },
    { name: "Physical Sales", value: physicalSalesVal, color: "#EF6C00" },
    { name: "Manual Sales", value: manualSalesVal, color: "#74777f" },
  ].filter(d => d.value > 0);

  // Category wise sales
  const salesByCategory = filteredSales.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.revenue;
    return acc;
  }, {});

  const salesByCategoryData = Object.keys(salesByCategory).map(key => ({
    name: key,
    value: salesByCategory[key],
    color: key === "Spiritual" ? "#002045" : key === "Stories" ? "#15803D" : key === "Philosophy" ? "#EF6C00" : "#74777f"
  }));

  // Language wise sales
  const salesByLanguage = filteredSales.reduce((acc: any, item) => {
    acc[item.language] = (acc[item.language] || 0) + item.revenue;
    return acc;
  }, {});

  const salesByLanguageData = Object.keys(salesByLanguage).map(key => ({
    language: key,
    revenue: salesByLanguage[key]
  }));

  // Best-selling Books (sorted by quantity)
  const bestSellers = filteredSales.reduce((acc: any, item) => {
    if (!acc[item.sku]) {
      acc[item.sku] = { sku: item.sku, title: item.title, quantity: 0, revenue: 0, language: item.language };
    }
    acc[item.sku].quantity += item.quantity;
    acc[item.sku].revenue += item.revenue;
    return acc;
  }, {});

  const bestSellersData = Object.values(bestSellers).sort((a: any, b: any) => b.quantity - a.quantity) as any[];

  // Inventory computations (using local storage data if available)
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("amrita_inventory");
    if (saved) {
      try {
        setInventoryList(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading inventory inside reports", e);
      }
    }
  }, []);

  // Compute Low stock items
  const lowStockItems = inventoryList.filter(item => {
    const stockToCompare = item.stock; // global stock
    return stockToCompare <= item.lowStockThreshold;
  });

  // Dead stock: items that have high stock (> 10 units) but 0 units sold in the selected date range
  const deadStockItems = inventoryList.filter(item => {
    const soldQty = filteredSales.filter(s => s.sku === item.sku).reduce((sum, s) => sum + s.quantity, 0);
    return item.stock > 10 && soldQty === 0;
  });

  // Fast-moving titles: items that sold the most in the selected range
  const fastMovingItems = [...bestSellersData].slice(0, 3);

  // Trigger Client-Side File Export
  const handleExport = (format: "pdf" | "excel" | "csv") => {
    setExportingType(format);
    setExportProgress(10);
    
    // Simulate loading progress bar
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            triggerFileDownload(format);
            setExportingType(null);
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const triggerFileDownload = (format: "pdf" | "excel" | "csv") => {
    let filename = `amrita_report_${activeTab}_${startDate}_to_${endDate}`;
    let fileContent = "";
    let mimeType = "text/plain";

    if (format === "csv") {
      filename += ".csv";
      mimeType = "text/csv";
      
      if (activeTab === "sales") {
        fileContent = "SKU,Title,Language,Quantity,Revenue (INR)\n";
        bestSellersData.forEach((item: any) => {
          fileContent += `"${item.sku}","${item.title}","${item.language}",${item.quantity},${item.revenue}\n`;
        });
      } else if (activeTab === "subscriptions") {
        fileContent = "Subscriber Name,Date Joined,Expiry Date,Status,Renewed,Amount\n";
        filteredSubscriptions.forEach((sub) => {
          fileContent += `"${sub.subscriberName}","${sub.dateJoined}","${sub.expiryDate}","${sub.status}",${sub.renewed},${sub.amount}\n`;
        });
      } else {
        fileContent = "SKU,Title,Language,Current Stock,Threshold,Status\n";
        inventoryList.forEach((item) => {
          const isLow = item.stock <= item.lowStockThreshold;
          fileContent += `"${item.sku}","${item.title}","${item.language}",${item.stock},${item.lowStockThreshold},"${isLow ? "Low Stock" : "In Stock"}"\n`;
        });
      }
    } else if (format === "excel") {
      filename += ".xls";
      mimeType = "application/vnd.ms-excel";
      
      // Basic Excel tab-separated file structure
      fileContent = `AMRITA BOOKS REPORT - ${activeTab.toUpperCase()} (${startDate} to ${endDate})\n\n`;
      if (activeTab === "sales") {
        fileContent += "SKU\tTitle\tLanguage\tQuantity\tRevenue\n";
        bestSellersData.forEach((item: any) => {
          fileContent += `${item.sku}\t${item.title}\t${item.language}\t${item.quantity}\t${item.revenue}\n`;
        });
      } else if (activeTab === "subscriptions") {
        fileContent += "Subscriber Name\tDate Joined\tExpiry Date\tStatus\tRenewed\tAmount\n";
        filteredSubscriptions.forEach((sub) => {
          fileContent += `${sub.subscriberName}\t${sub.dateJoined}\t${sub.expiryDate}\t${sub.status}\t${sub.renewed}\t${sub.amount}\n`;
        });
      } else {
        fileContent += "SKU\tTitle\tLanguage\tCurrent Stock\tThreshold\tStatus\n";
        inventoryList.forEach((item) => {
          const isLow = item.stock <= item.lowStockThreshold;
          fileContent += `${item.sku}\t${item.title}\t${item.language}\t${item.stock}\t${item.lowStockThreshold}\t${isLow ? "Low Stock" : "In Stock"}\n`;
        });
      }
    } else {
      // PDF - Structured ASCII PDF text report
      filename += ".txt";
      mimeType = "text/plain";
      
      fileContent = `========================================================\n`;
      fileContent += `              AMRITA BOOKS REPORT & ANALYTICS           \n`;
      fileContent += `========================================================\n`;
      fileContent += `Report Module: ${activeTab.toUpperCase()}\n`;
      fileContent += `Report Period: ${startDate} to ${endDate}\n`;
      fileContent += `Generated On : ${new Date().toISOString().split("T")[0]}\n`;
      fileContent += `========================================================\n\n`;
      
      if (activeTab === "sales") {
        fileContent += `SUMMARY METRICS:\n`;
        fileContent += `- Total Sales Revenue: INR ${totalRevenue.toLocaleString()}\n`;
        fileContent += `- Total Books Sold: ${totalSalesCount} units\n`;
        fileContent += `- Average Order Value: INR ${averageOrderValue.toLocaleString()}\n\n`;
        fileContent += `BEST SELLING TITLES:\n`;
        bestSellersData.forEach((item: any, idx: number) => {
          fileContent += `${idx + 1}. [${item.sku}] ${item.title} (${item.language}) - Sold: ${item.quantity} units, Rev: INR ${item.revenue.toLocaleString()}\n`;
        });
      } else if (activeTab === "subscriptions") {
        fileContent += `SUMMARY METRICS:\n`;
        fileContent += `- Active Expiring Subscriptions (in range): ${filteredSubscriptions.filter(s => s.status === "Active").length}\n`;
        fileContent += `- Expired Subscriptions (in range): ${filteredSubscriptions.filter(s => s.status === "Expired").length}\n\n`;
        fileContent += `SUBSCRIBER DETAIL LIST:\n`;
        filteredSubscriptions.forEach((sub, idx) => {
          fileContent += `${idx + 1}. ${sub.subscriberName} | Joined: ${sub.dateJoined} | Expiry: ${sub.expiryDate} | Status: ${sub.status} | Renewed: ${sub.renewed ? "Yes" : "No"}\n`;
        });
      } else {
        fileContent += `INVENTORY LOGISTICS REPORT:\n\n`;
        fileContent += `LOW STOCK ITEMS (${lowStockItems.length} Skus):\n`;
        lowStockItems.forEach((item, idx) => {
          fileContent += `- ${idx + 1}. [${item.sku}] ${item.title} | Stock: ${item.stock} / Threshold: ${item.lowStockThreshold}\n`;
        });
        fileContent += `\nDEAD STOCK ITEMS (Stock > 10, 0 sold in range - ${deadStockItems.length} Skus):\n`;
        deadStockItems.forEach((item, idx) => {
          fileContent += `- ${idx + 1}. [${item.sku}] ${item.title} | Current Stock: ${item.stock}\n`;
        });
      }
      fileContent += `\n================== End of Report ==================`;
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Reports & Analytics</h1>
          <p className="text-sm text-[#43474e] font-normal leading-5">Analyze book revenues, subscription trajectories, and stock dynamics.</p>
        </div>

        {/* Global Date Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-border shadow-sm flex-shrink-0">
          <div className="flex gap-1">
            {[
              { id: "7d", label: "7d" },
              { id: "30d", label: "30d" },
              { id: "thisMonth", label: "This Month" },
              { id: "lastMonth", label: "Last Month" },
              { id: "custom", label: "Custom" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setDatePreset(p.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none ${
                  datePreset === p.id
                    ? "bg-[#002045] text-white"
                    : "bg-transparent text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {datePreset === "custom" && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-border animate-[fadeIn_0.2s_ease-out]">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 bg-background border border-border rounded text-[11px] font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--color-saffron)] cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground font-semibold">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 bg-background border border-border rounded text-[11px] font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--color-saffron)] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Module Tabs & Export Actions */}
      <div className="flex items-center justify-between border-b border-border bg-card rounded-t-xl px-4 py-2">
        <div className="flex gap-2">
          {[
            { id: "sales", label: "Sales Reports", icon: TrendingUp },
            { id: "subscriptions", label: "Subscription Reports", icon: Users },
            { id: "inventory", label: "Inventory Reports", icon: Archive },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-semibold text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-[var(--color-saffron)] text-[var(--color-saffron)]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Export Buttons */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F8FAFC] transition-all text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
            <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 mt-1 w-44 bg-white border border-[#e6e8ea] rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button 
              onClick={() => handleExport("pdf")}
              className="w-full text-left px-3 py-1.5 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-xs text-[#191c1e] border-none bg-transparent cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export PDF Summary
            </button>
            <button 
              onClick={() => handleExport("excel")}
              className="w-full text-left px-3 py-1.5 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-xs text-[#191c1e] border-none bg-transparent cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export Excel Spreadsheet
            </button>
            <button 
              onClick={() => handleExport("csv")}
              className="w-full text-left px-3 py-1.5 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-xs text-[#191c1e] border-none bg-transparent cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV Spreadsheet
            </button>
            <button 
              onClick={handleExportAllInvoices}
              className="w-full text-left px-3 py-1.5 border-t border-slate-100 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-xs text-[#191c1e] border-none bg-transparent cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Export All Invoices PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "sales" && (
        <div className="space-y-5 animate-[fadeIn_0.2s_ease-out]">
          {/* Sales Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MetricCard
              label="Overall Sales Revenue"
              value={`₹${totalRevenue.toLocaleString()}`}
              iconPaths={[]}
              showIcon={false}
              trend={{ value: "+12.4%", direction: "up", note: "vs prev range" }}
              subtitle="Total gross receipts"
            />
            <MetricCard
              label="Books Ordered"
              value={totalSalesCount}
              iconPaths={[]}
              showIcon={false}
              trend={{ value: "+8.9%", direction: "up", note: "vs prev range" }}
              subtitle="Physical & Digital copies"
            />
            <MetricCard
              label="Average Order Value"
              value={`₹${averageOrderValue.toLocaleString()}`}
              iconPaths={[]}
              showIcon={false}
              subtitle="Estimated checkout basket"
            />
          </div>

          {/* Sales Channel Breakdown Card (Online vs Physical vs Manual) */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#191c1e] mb-3.5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--color-saffron)]" />
              Sales Channel Breakdown (Online, Physical & Manual)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-4 space-y-3">
                {[
                  { label: "Online Sales (Orders Portal)", key: "online", val: onlineSalesVal, pct: totalRevenue > 0 ? Math.round((onlineSalesVal/totalRevenue)*100) : 0, color: "#002045", desc: "Razorpay checkouts" },
                  { label: "Physical Sales (Store Outlets)", key: "physical", val: physicalSalesVal, pct: totalRevenue > 0 ? Math.round((physicalSalesVal/totalRevenue)*100) : 0, color: "#EF6C00", desc: "Direct cash/POS orders" },
                  { label: "Manual Sales (Admin Console)", key: "manual", val: manualSalesVal, pct: totalRevenue > 0 ? Math.round((manualSalesVal/totalRevenue)*100) : 0, color: "#74777f", desc: "Admin manual bookings" },
                ].map((channel) => (
                  <div key={channel.key} className="p-3 border border-border bg-slate-50/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-foreground flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                        {channel.label}
                      </span>
                      <span className="text-xs font-bold text-[#002045]">{channel.pct}%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-muted-foreground">{channel.desc}</span>
                      <span className="text-xs font-semibold text-foreground">₹{channel.val.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-8 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByChannelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {salesByChannelData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => `₹${v.toLocaleString()}`} />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recharts Category and Language Visual Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Category Wise sales */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#191c1e] mb-2.5">Category-wise Sales Shares</h3>
                <p className="text-xs text-muted-foreground mb-4">Breakdown of gross revenue by publisher categories.</p>
              </div>
              <div className="h-[220px]">
                {salesByCategoryData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">No sales data in this date range.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={75}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {salesByCategoryData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => `₹${v.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Language wise sales */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#191c1e] mb-2.5">Language-wise Sales Distribution</h3>
                <p className="text-xs text-muted-foreground mb-4">Total revenue metrics across book languages.</p>
              </div>
              <div className="h-[220px]">
                {salesByLanguageData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">No sales data in this date range.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByLanguageData} barSize={35}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="language" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                      <Tooltip formatter={(v: any) => `₹${v.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#002045" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Best-selling Books / Revenue by Title */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-bold text-[#191c1e]">Best-selling Books & Revenue by Title</h3>
              <p className="text-[11px] text-muted-foreground">List of titles sorted by unit quantity demand during the period.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Book Title</th>
                    <th className="px-6 py-3">SKU Code</th>
                    <th className="px-6 py-3">Language</th>
                    <th className="px-6 py-3">Units Sold</th>
                    <th className="px-6 py-3 text-right">Revenue Generated</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bestSellersData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground italic bg-white">
                        No transactions registered in this timeframe.
                      </td>
                    </tr>
                  ) : (
                    bestSellersData.map((item) => (
                      <tr key={item.sku} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-6 py-3.5 font-semibold text-foreground flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          {item.title}
                        </td>
                        <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">{item.sku}</td>
                        <td className="px-6 py-3.5 text-xs">
                          <span className="px-2 py-0.5 bg-[#F1F5F9] rounded border border-border text-foreground font-medium">{item.language}</span>
                        </td>
                        <td className="px-6 py-3.5 font-bold text-foreground">{item.quantity} units</td>
                        <td className="px-6 py-3.5 text-right font-bold text-[#002045]">₹{item.revenue.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "subscriptions" && (
        <div className="space-y-5 animate-[fadeIn_0.2s_ease-out]">
          {/* Subscription Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MetricCard
              label="Active Subscriptions"
              value={mockSubscriptions.filter(s => s.status === "Active").length}
              iconPaths={[]}
              showIcon={false}
              subtitle="Registered subscribers"
            />
            <MetricCard
              label="Renewal Success Rate"
              value="84.6%"
              iconPaths={[]}
              showIcon={false}
              subtitle="Based on expiring accounts"
              valueColor="#15803D"
            />
            <MetricCard
              label="Expiry Notices Pending"
              value={filteredSubscriptions.length}
              iconPaths={[]}
              showIcon={false}
              subtitle={`Expiring between range`}
              valueColor="#EF6C00"
            />
          </div>

          {/* Expiry Tracking list */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-[#191c1e]">Expiry Tracking & Renewal Schedule</h3>
                <p className="text-[11px] text-muted-foreground">List of subscriptions with expiration dates inside the selected period.</p>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">
                Range Expiring: {filteredSubscriptions.length} account(s)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Subscriber</th>
                    <th className="px-6 py-3">Joined Date</th>
                    <th className="px-6 py-3">Expiry Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Auto Renew</th>
                    <th className="px-6 py-3 text-right">Value (INR)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredSubscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground italic bg-white">
                        No subscription expiries located in this date range.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscriptions.map((sub) => {
                      const isExpired = sub.status === "Expired";
                      return (
                        <tr key={sub.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-6 py-3.5 font-semibold text-foreground flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            {sub.subscriberName}
                          </td>
                          <td className="px-6 py-3.5 text-muted-foreground">{sub.dateJoined}</td>
                          <td className="px-6 py-3.5 font-semibold text-foreground flex items-center gap-1.5">
                            <Clock className={`w-3.5 h-3.5 ${isExpired ? "text-red-500" : "text-amber-500"}`} />
                            {sub.expiryDate}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isExpired 
                                ? "bg-red-50 text-red-700 border-red-200" 
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            {sub.renewed ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" /> Yes
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                <Clock className="w-3.5 h-3.5" /> No
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3.5 text-right font-bold text-[#002045]">₹{sub.amount.toLocaleString()}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "inventory" && (
        <div className="space-y-5 animate-[fadeIn_0.2s_ease-out]">
          {/* Inventory Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MetricCard
              label="SKUs Below Threshold"
              value={lowStockItems.length}
              iconPaths={[]}
              showIcon={false}
              subtitle="Need restocking immediately"
              valueColor="#B91C1C"
            />
            <MetricCard
              label="Dead Stock SKUs"
              value={deadStockItems.length}
              iconPaths={[]}
              showIcon={false}
              subtitle="Stock >10 units, 0 sales in period"
              valueColor="#74777f"
            />
            <MetricCard
              label="Total Tracked SKUs"
              value={inventoryList.length}
              iconPaths={[]}
              showIcon={false}
              subtitle="Book titles and language pairs"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Low Stock Items List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#191c1e] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    SKUs Needing Restock
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded">
                    Total: {lowStockItems.length}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground font-semibold">
                      <tr>
                        <th className="px-5 py-2.5">Title</th>
                        <th className="px-5 py-2.5">Stock</th>
                        <th className="px-5 py-2.5 text-right">Threshold</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {lowStockItems.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-5 py-6 text-center text-muted-foreground italic">
                            All inventory counts are above alert levels.
                          </td>
                        </tr>
                      ) : (
                        lowStockItems.map((item) => (
                          <tr key={item.sku} className="border-b border-[#E2E8F0] hover:bg-slate-50">
                            <td className="px-5 py-2.5">
                              <div className="font-semibold text-foreground">{item.title}</div>
                              <div className="text-[10px] text-muted-foreground font-mono">{item.sku} · {item.language}</div>
                            </td>
                            <td className="px-5 py-2.5 font-bold text-red-600">{item.stock} units</td>
                            <td className="px-5 py-2.5 text-right text-muted-foreground font-semibold">{item.lowStockThreshold} units</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Dead Stock Identifier List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#191c1e] flex items-center gap-1.5">
                    <Archive className="w-4 h-4 text-slate-500" />
                    Dead Stock (No movement in period)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                    Total: {deadStockItems.length}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground font-semibold">
                      <tr>
                        <th className="px-5 py-2.5">Title</th>
                        <th className="px-5 py-2.5">Current Stock</th>
                        <th className="px-5 py-2.5 text-right">Language</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {deadStockItems.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-5 py-6 text-center text-muted-foreground italic">
                            No dead stock detected (all items showed sales activity).
                          </td>
                        </tr>
                      ) : (
                        deadStockItems.map((item) => (
                          <tr key={item.sku} className="border-b border-[#E2E8F0] hover:bg-slate-50">
                            <td className="px-5 py-2.5">
                              <div className="font-semibold text-foreground">{item.title}</div>
                              <div className="text-[10px] text-muted-foreground font-mono">{item.sku}</div>
                            </td>
                            <td className="px-5 py-2.5 font-bold text-foreground">{item.stock} units</td>
                            <td className="px-5 py-2.5 text-right font-medium text-slate-500">{item.language}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Fast-Moving Items List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-bold text-[#191c1e]">Fast-moving Titles (High Velocity)</h3>
              <p className="text-[11px] text-muted-foreground">Titles experiencing high sales counts during this date selection.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Book Title</th>
                    <th className="px-6 py-3">SKU</th>
                    <th className="px-6 py-3">Units Sold</th>
                    <th className="px-6 py-3 text-right">Revenue Share</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {fastMovingItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic bg-white">
                        No transactions registered in this timeframe to estimate sales velocity.
                      </td>
                    </tr>
                  ) : (
                    fastMovingItems.map((item: any) => (
                      <tr key={item.sku} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-6 py-3.5 font-semibold text-foreground flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          {item.title}
                        </td>
                        <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">{item.sku}</td>
                        <td className="px-6 py-3.5 font-bold text-foreground">{item.quantity} units</td>
                        <td className="px-6 py-3.5 text-right font-bold text-emerald-700">₹{item.revenue.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Export Loader Overlay */}
      {exportingType && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-200 rounded-xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center text-center space-y-4">
            <Loader2 className="w-10 h-10 text-[var(--color-saffron)] animate-spin" />
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Generating {exportingType.toUpperCase()} Report</h4>
              <p className="text-xs text-muted-foreground mt-1">Assembling data tables, parsing date filters, and compiling layout components...</p>
            </div>
            
            {/* Progress bar container */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
              <div 
                className="bg-[var(--color-saffron)] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{exportProgress}% Completed</span>
          </div>
        </div>
      )}

      {/* Printable Invoice Pack (Triggered for PDF generation) */}
      {isPrintingAll && (
        <div className="hidden print:block bg-white text-slate-900 absolute inset-0 z-[9999] p-0 font-sans">
          {printOrders.map((order) => {
            const shipping = order.orderType === "physical" ? 100 : 0;
            const preTaxAndShipping = order.total - shipping;
            const subtotal = Math.round((preTaxAndShipping / 1.18) * 100) / 100;
            const gst = Math.round((preTaxAndShipping - subtotal) * 100) / 100;
            const invoiceNum = order.invoiceNumber || `INV-${order.orderNumber}`;
            const gstNumber = "29AMBMA9876F1Z2";

            return (
              <div key={order.id} className="p-8 space-y-6 bg-white min-h-screen flex flex-col justify-between" style={{ pageBreakAfter: "always" }}>
                {/* Logo & Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="Amrita Books Logo" className="w-12 h-12 object-contain" />
                    <div>
                      <h1 className="text-lg font-bold text-[#002045] uppercase tracking-wide">Amrita Books</h1>
                      <p className="text-[10px] text-slate-400 leading-tight">Mata Amritanandamayi Math<br/>Amritapuri, Kollam, Kerala - 690525</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-extrabold text-[#002045] tracking-tight uppercase">Invoice</h2>
                    <div className="text-xs space-y-0.5 mt-2">
                      <p><span className="text-slate-400">Invoice #:</span> <span className="font-semibold">{invoiceNum}</span></p>
                      <p><span className="text-slate-400">GSTIN:</span> <span className="font-mono font-semibold">{gstNumber}</span></p>
                      <p><span className="text-slate-400">Date:</span> <span className="font-semibold">{order.createdAt}</span></p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Billing Info */}
                <div className="grid grid-cols-2 gap-6 text-xs text-left">
                  <div>
                    <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5">Billed To</p>
                    <p className="font-bold text-[#1E293B] text-sm">{order.customer}</p>
                    <p className="text-slate-500 mt-0.5">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5">Payment Details</p>
                    <p className="font-semibold text-slate-700">Online Payment Gateway</p>
                    <p className="text-slate-400 mt-0.5">Order Ref: {order.orderNumber}</p>
                  </div>
                </div>

                {/* Division table */}
                <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Item Details</th>
                        <th className="py-2.5 px-3 text-center">Format</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {order.orderItems && order.orderItems.length > 0 ? (
                        order.orderItems.map((item: any, i: number) => (
                          <tr key={i} className="text-slate-700">
                            <td className="p-3 font-semibold text-slate-850">
                              {item.bookTitle} <span className="text-[10px] text-slate-400">({item.language})</span>
                            </td>
                            <td className="p-3 text-center capitalize text-slate-650">{item.format}</td>
                            <td className="p-3 text-center text-slate-650">{item.quantity}</td>
                            <td className="p-3 text-right text-slate-650">₹{item.price.toLocaleString()}</td>
                            <td className="p-3 text-right font-semibold text-slate-850">₹{(item.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr className="text-slate-700">
                          <td className="p-3 font-semibold text-slate-850">
                            {order.orderType === "subscription" ? "Amrita Books Reading Subscription" : "General Bookstore Order"}
                          </td>
                          <td className="p-3 text-center capitalize text-slate-650">{order.orderType}</td>
                          <td className="p-3 text-center text-slate-650">1</td>
                          <td className="p-3 text-right text-slate-650">₹{preTaxAndShipping.toLocaleString()}</td>
                          <td className="p-3 text-right font-semibold text-slate-855">₹{preTaxAndShipping.toLocaleString()}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pricing Totals Section */}
                <div className="flex justify-end text-xs">
                  <div className="w-64 space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal (Excl. Tax)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>GST (18%)</span>
                      <span>₹{gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping Fees</span>
                      <span>₹{shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-[#002045] pt-2 border-t border-slate-100">
                      <span>Total Amount</span>
                      <span>₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-center pt-6 text-[10px] text-slate-400 border-t border-slate-50 mt-auto">
                  <p>Thank you for supporting spiritual publications. This is a computer generated tax invoice.</p>
                  <p className="mt-1">For support, email: billing@amritabooks.com</p>
                </div>
              </div>
            );
          })}
          
          <style>{`
            @media print {
              body > * {
                display: none !important;
              }
              .hidden.print\\:block {
                display: block !important;
                position: absolute !important;
                left: 0;
                top: 0;
                width: 100%;
                background: white !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
