import { useState, useEffect, useRef } from "react";
import { Search, Eye, RotateCcw, DollarSign, Crown, CreditCard, Calendar, ShoppingBag, User, Globe, Plus, UserPlus, Gift, CalendarCheck, ShieldCheck, X, ChevronDown, ChevronUp, FileText, Upload, Check, Download } from "lucide-react";
import { MetricCard } from "../MetricCard";
import { getPricingGroups, PricingGroup, convertPrice } from "../../utils/pricingStore";

type Plan = {
  id: string;
  name: string;
  durationDays: number;
  priceIndia: number;
  priceRow: number;
  prices?: Record<string, number>;
  description: string;
  status: "Active" | "Draft" | "Archived";
};

const calculateAutoPrice = (group: PricingGroup, durationDays: number, baseIndiaPrice?: number): number => {
  let basePrice = baseIndiaPrice;
  if (basePrice === undefined) {
    if (durationDays <= 7) basePrice = 49;
    else if (durationDays <= 30) basePrice = 199;
    else if (durationDays <= 90) basePrice = 499;
    else if (durationDays <= 180) basePrice = 999;
    else basePrice = 1999;
  }

  return convertPrice(basePrice, group.multiple, group.currency);
};

const getUserPricingGroup = (country: string, groups: PricingGroup[]): PricingGroup => {
  const match = groups.find(g => g.countries.includes(country));
  if (match) return match;
  if (country === "India") return groups.find(g => g.id === "india") || groups[0];
  return groups.find(g => g.id === "row") || groups[0];
};

type Subscriber = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Expired" | "Cancelled" | "Complimentary" | "Pending";
  planName: string;
  source: "Purchased" | "Complimentary" | "Admin Assigned" | "Promotional";
  promotionalType?: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  assignedBy: string;
  libraryCount: number;
  totalSpent: number;
  country: string;
  orders: { id: string; date: string; amount: number; status: string }[];
  activityHistory?: { date: string; action: string; note: string }[];
  paymentHistory?: { date: string; amount: number; method: string; status: string }[];
  renewalHistory?: { date: string; planName: string; expiryDate: string }[];
  invoiceFile?: { name: string; size: number; type: string; dataUrl?: string };
};

const initialPlans: Plan[] = [
  { id: "1", name: "Weekly Plan", durationDays: 7, priceIndia: 49, priceRow: 0.99, description: "7 Day Access to all content", status: "Active" },
  { id: "2", name: "Monthly Plan", durationDays: 30, priceIndia: 199, priceRow: 4.99, description: "Flexible monthly reading access", status: "Active" },
  { id: "3", name: "Quarterly Plan", durationDays: 90, priceIndia: 499, priceRow: 12.99, description: "Extended 3-month reading access", status: "Active" },
  { id: "4", name: "Half Yearly Plan", durationDays: 180, priceIndia: 999, priceRow: 24.99, description: "6-month reading access", status: "Active" },
  { id: "5", name: "Yearly Plan", durationDays: 365, priceIndia: 1999, priceRow: 49.99, description: "Unrestricted annual reading access", status: "Active" },
];

const initialSubscribers: Subscriber[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    status: "Active",
    planName: "Yearly Plan",
    source: "Purchased",
    subscriptionStart: "2026-01-01",
    subscriptionEnd: "2026-12-31",
    assignedBy: "System",
    libraryCount: 45,
    totalSpent: 1999,
    country: "India",
    orders: [
      { id: "AMR-2847", date: "2026-04-05", amount: 1999, status: "Delivered" },
    ],
    activityHistory: [
      { date: "2026-01-01", action: "Subscription Started", note: "Purchased Yearly Plan online" },
    ],
    paymentHistory: [
      { date: "2026-01-01", amount: 1999, method: "UPI", status: "Success" }
    ],
    renewalHistory: []
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    status: "Expired",
    planName: "Monthly Plan",
    source: "Purchased",
    subscriptionStart: "2026-02-15",
    subscriptionEnd: "2026-03-15",
    assignedBy: "System",
    libraryCount: 23,
    totalSpent: 199,
    country: "India",
    orders: [
      { id: "AMR-2541", date: "2026-03-01", amount: 199, status: "Delivered" },
    ],
    activityHistory: [
      { date: "2026-02-15", action: "Subscription Started", note: "Purchased Monthly Plan online" },
      { date: "2026-03-15", action: "Subscription Expired", note: "Auto-renew failed" }
    ],
    paymentHistory: [
      { date: "2026-02-15", amount: 199, method: "Card", status: "Success" }
    ],
    renewalHistory: []
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    status: "Active",
    planName: "Monthly Plan",
    source: "Purchased",
    subscriptionStart: "2026-05-20",
    subscriptionEnd: "2027-01-20",
    assignedBy: "System",
    libraryCount: 67,
    totalSpent: 99.9,
    country: "United States",
    orders: [
      { id: "AMR-2910", date: "2026-04-06", amount: 9.99, status: "Shipped" },
      { id: "AMR-2891", date: "2026-03-20", amount: 89.91, status: "Delivered" },
    ],
    activityHistory: [
      { date: "2026-05-20", action: "Subscription Started", note: "Purchased Monthly Plan online" },
    ],
    paymentHistory: [
      { date: "2026-05-20", amount: 9.99, method: "PayPal", status: "Success" }
    ],
    renewalHistory: []
  },
  {
    id: "4",
    name: "Swami Dhyanamrita",
    email: "dhyanamrita@ashram.org",
    status: "Complimentary",
    planName: "Yearly Plan",
    source: "Complimentary",
    subscriptionStart: "2026-01-15",
    subscriptionEnd: "2027-01-15",
    assignedBy: "Admin (kevin)",
    libraryCount: 124,
    totalSpent: 0,
    country: "India",
    orders: [],
    activityHistory: [
      { date: "2026-01-15", action: "Complimentary Granted", note: "Granted by Admin for Ashram library setup" }
    ],
    paymentHistory: [],
    renewalHistory: []
  }
];

const subscriptionConfig = {
  Active: { label: "Active", color: "bg-[#DCFCE7] text-[#15803D]" },
  Expired: { label: "Expired", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  Cancelled: { label: "Cancelled", color: "bg-[#F1F5F9] text-[#475569]" },
  Complimentary: { label: "Complimentary", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  Pending: { label: "Pending", color: "bg-[#FEF3C7] text-[#92400E]" },
};

const sourceConfig = {
  Purchased: { label: "Purchased", color: "bg-[#DCFCE7] text-[#15803D]" },
  Complimentary: { label: "Complimentary", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  "Admin Assigned": { label: "Admin Assigned", color: "bg-[#EDE9FE] text-[#6D28D9]" },
  Promotional: { label: "Promotional", color: "bg-[#FEF3C7] text-[#92400E]" },
};

export function SubscriptionManagement() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem("amrita_plans");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing amrita_plans", e);
      }
    }
    localStorage.setItem("amrita_plans", JSON.stringify(initialPlans));
    return initialPlans;
  });

  useEffect(() => {
    localStorage.setItem("amrita_plans", JSON.stringify(plans));
  }, [plans]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    const saved = localStorage.getItem("amrita_subscribers");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing amrita_subscribers", e);
      }
    }
    localStorage.setItem("amrita_subscribers", JSON.stringify(initialSubscribers));
    return initialSubscribers;
  });

  useEffect(() => {
    localStorage.setItem("amrita_subscribers", JSON.stringify(subscribers));
  }, [subscribers]);
  
  const [selectedSub, setSelectedSub] = useState<Subscriber | null>(null);
  
  // File upload states
  const [assignInvoiceFile, setAssignInvoiceFile] = useState<{ name: string; size: number; type: string; dataUrl?: string } | null>(null);
  const assignFileInputRef = useRef<HTMLInputElement>(null);
  const [previewInvoiceFile, setPreviewInvoiceFile] = useState<{ name: string; size: number; type: string; dataUrl?: string } | null>(null);
  const [pricingGroups, setPricingGroups] = useState<PricingGroup[]>([]);
  const [activeRegionId, setActiveRegionId] = useState("india");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [expiryFilter, setExpiryFilter] = useState("All");
  const [pricingGroupFilter, setPricingGroupFilter] = useState("All");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"subscribers" | "plans">("subscribers");

  // Modals States
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showAssignSub, setShowAssignSub] = useState(false);
  const [showExtendSub, setShowExtendSub] = useState(false);

  // Extend Expiry Temp State
  const [extensionDays, setExtensionDays] = useState("30");
  const [customExpiryDate, setCustomExpiryDate] = useState("");

  // Create Plan Form States
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDuration, setNewPlanDuration] = useState("30");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [newPlanStatus, setNewPlanStatus] = useState<"Active" | "Draft" | "Archived">("Active");
  const [newPlanPrices, setNewPlanPrices] = useState<Record<string, string>>({});

  // Assign Subscription Form States
  const [assignUserMode, setAssignUserMode] = useState<"existing" | "new">("existing");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserCountry, setNewUserCountry] = useState("India");
  
  const [assignType, setAssignType] = useState<"plan" | "complimentary">("plan");
  const [assignPlanId, setAssignPlanId] = useState("2"); // defaults to Monthly Plan

  // Complimentary specific options
  const [compValidityMode, setCompValidityMode] = useState<"days" | "date">("days");
  const [compDays, setCompDays] = useState("30");
  const [compDate, setCompDate] = useState("");
  const [assignSource, setAssignSource] = useState<"Complimentary" | "Admin Assigned" | "Promotional">("Complimentary");
  const [promoCampaign, setPromoCampaign] = useState("Amma Event Access");

  // Load pricing groups
  useEffect(() => {
    setPricingGroups(getPricingGroups());
  }, []);

  // Sync pricing updates
  useEffect(() => {
    const handleUpdate = () => {
      setPricingGroups(getPricingGroups());
    };
    window.addEventListener("amrita_pricing_groups_updated", handleUpdate);
    return () => window.removeEventListener("amrita_pricing_groups_updated", handleUpdate);
  }, []);

  const handleExportCSV = () => {
    if (filteredSubscribers.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Subscriber Name", "Email", "Country", "Plan", "Price Paid", "Source", "Status", "Valid Until", "Assigned By"];
    const rows = filteredSubscribers.map(sub => [
      sub.name,
      sub.email,
      sub.country,
      sub.planName,
      `${sub.currencySymbol || "₹"}${sub.pricePaid}`,
      sub.source,
      sub.status,
      sub.validUntil,
      sub.assignedBy || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `filtered_subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Find active region currency symbol
  const activeGroup = pricingGroups.find((g) => g.id === activeRegionId) || pricingGroups[0] || {
    id: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "₹"
  };

  // Filter subscribers list
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    const matchesPlan = planFilter === "All" || sub.planName === planFilter;
    const matchesSource = sourceFilter === "All" || sub.source === sourceFilter;
    const matchesCountry = countryFilter === "All" || sub.country === countryFilter;
    
    // Pricing Group filter logic
    let matchesPricingGroup = true;
    if (pricingGroupFilter !== "All") {
      const group = pricingGroups.find(g => g.id === pricingGroupFilter);
      if (group) {
        if (group.id === "row") {
          const otherCountries = pricingGroups
            .filter(g => g.id !== "row" && g.id !== "india")
            .flatMap(g => g.countries);
          matchesPricingGroup = sub.country !== "India" && !otherCountries.includes(sub.country);
        } else if (group.id === "india") {
          matchesPricingGroup = sub.country === "India";
        } else {
          matchesPricingGroup = group.countries.includes(sub.country);
        }
      }
    }

    // Expiry filter logic
    let matchesExpiry = true;
    if (expiryFilter !== "All") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiryDate = new Date(sub.subscriptionEnd);
      expiryDate.setHours(0, 0, 0, 0);
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (expiryFilter === "expired") {
        matchesExpiry = diffDays < 0 || sub.status === "Expired";
      } else if (expiryFilter === "7days") {
        matchesExpiry = diffDays >= 0 && diffDays <= 7;
      } else if (expiryFilter === "30days") {
        matchesExpiry = diffDays >= 0 && diffDays <= 30;
      }
    }

    return matchesSearch && matchesStatus && matchesPlan && matchesSource && matchesCountry && matchesPricingGroup && matchesExpiry;
  });

  // Unique lists for filters
  const uniqueCountries = Array.from(new Set(subscribers.map(s => s.country)));

  // Calculate Expiry Date Helper
  const calculateExpiry = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  // Create Plan Handler
  const handleCreatePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName.trim()) {
      alert("Plan name is required");
      return;
    }
    const finalPrices: Record<string, number> = {};
    pricingGroups.forEach(g => {
      if (newPlanPrices[g.id]) {
        finalPrices[g.id] = parseFloat(newPlanPrices[g.id]);
      } else {
        finalPrices[g.id] = calculateAutoPrice(g, parseInt(newPlanDuration) || 30);
      }
    });

    const newPlan: Plan = {
      id: String(plans.length + 1),
      name: newPlanName,
      durationDays: parseInt(newPlanDuration) || 30,
      priceIndia: finalPrices["india"] || 0,
      priceRow: finalPrices["row"] || 0,
      prices: finalPrices,
      description: newPlanDesc,
      status: newPlanStatus
    };
    setPlans([...plans, newPlan]);
    setShowCreatePlan(false);
    
    // Clear inputs
    setNewPlanName("");
    setNewPlanPrices({});
    setNewPlanDesc("");
  };

  const handleAssignInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAssignInvoiceFile({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAssignInvoice = () => {
    setAssignInvoiceFile(null);
    if (assignFileInputRef.current) assignFileInputRef.current.value = "";
  };

  const handleCloseAssignSub = () => {
    setShowAssignSub(false);
    setNewUserName("");
    setNewUserEmail("");
    setSelectedUserEmail("");
    setAssignInvoiceFile(null);
    if (assignFileInputRef.current) assignFileInputRef.current.value = "";
  };

  // Assign Subscription Handler
  const handleAssignSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let userName = "";
    let userEmail = "";
    let userCountry = "India";

    if (assignUserMode === "existing") {
      if (!selectedUserEmail) {
        alert("Please select a user");
        return;
      }
      const existing = subscribers.find(s => s.email === selectedUserEmail);
      userName = existing ? existing.name : "Selected User";
      userEmail = selectedUserEmail;
      userCountry = existing ? existing.country : "India";
    } else {
      if (!newUserName.trim() || !newUserEmail.trim()) {
        alert("Please provide Name and Email for the new user");
        return;
      }
      userName = newUserName;
      userEmail = newUserEmail;
      userCountry = newUserCountry;
    }

    let planName = "Custom Complimentary";
    let expiryDate = "";
    let totalSpent = 0;
    let finalSource: Subscriber["source"] = "Complimentary";
    let finalStatus: Subscriber["status"] = "Complimentary";

    if (assignType === "plan") {
      const selectedPlan = plans.find(p => p.id === assignPlanId);
      if (!selectedPlan) {
        alert("Please select a plan");
        return;
      }
      planName = selectedPlan.name;
      expiryDate = calculateExpiry(selectedPlan.durationDays);
      
      const userGroup = getUserPricingGroup(userCountry, pricingGroups);
      const planPrice = selectedPlan.prices?.[userGroup.id] !== undefined
        ? selectedPlan.prices[userGroup.id]
        : (userGroup.id === "india" ? selectedPlan.priceIndia : calculateAutoPrice(userGroup, selectedPlan.durationDays, selectedPlan.priceIndia));
      totalSpent = planPrice;
      
      finalSource = "Admin Assigned";
      finalStatus = "Active";
    } else {
      // Complimentary Access
      finalSource = assignSource;
      finalStatus = "Complimentary";
      planName = assignSource === "Promotional" ? `Promo: ${promoCampaign}` : "Complimentary Access";
      
      if (compValidityMode === "days") {
        expiryDate = calculateExpiry(parseInt(compDays) || 30);
      } else {
        if (!compDate) {
          alert("Please pick an expiry date");
          return;
        }
        expiryDate = compDate;
      }
    }

    const newSub: Subscriber = {
      id: String(subscribers.length + 1),
      name: userName,
      email: userEmail,
      status: finalStatus,
      planName,
      source: finalSource,
      promotionalType: finalSource === "Promotional" ? promoCampaign : undefined,
      subscriptionStart: new Date().toISOString().split("T")[0],
      subscriptionEnd: expiryDate,
      assignedBy: "Admin (kevin)",
      libraryCount: 0,
      totalSpent,
      country: userCountry,
      orders: [],
      activityHistory: [
        { date: new Date().toISOString().split("T")[0], action: "Subscription Assigned", note: `Assigned as ${finalSource} by Admin` }
      ],
      paymentHistory: totalSpent > 0 ? [
        { date: new Date().toISOString().split("T")[0], amount: totalSpent, method: "Admin Terminal", status: "Success" }
      ] : [],
      renewalHistory: [],
      invoiceFile: assignInvoiceFile || undefined
    };

    setSubscribers([newSub, ...subscribers]);
    setShowAssignSub(false);

    // reset fields
    setNewUserName("");
    setNewUserEmail("");
    setSelectedUserEmail("");
    setAssignInvoiceFile(null);
    if (assignFileInputRef.current) assignFileInputRef.current.value = "";
  };

  // Extend Subscription expiry date
  const handleExtendExpiry = () => {
    if (!selectedSub) return;
    
    let newExpiry = "";
    let note = "";
    if (extensionDays !== "custom") {
      const days = parseInt(extensionDays);
      const baseDate = new Date(selectedSub.status === "Expired" ? new Date() : selectedSub.subscriptionEnd);
      baseDate.setDate(baseDate.getDate() + days);
      newExpiry = baseDate.toISOString().split("T")[0];
      note = `Subscription extended by ${days} days by Admin`;
    } else {
      if (!customExpiryDate) {
        alert("Please choose a valid date");
        return;
      }
      newExpiry = customExpiryDate;
      note = `Subscription validity extended until ${customExpiryDate} by Admin`;
    }

    const updatedSubscribers = subscribers.map(s => {
      if (s.id === selectedSub.id) {
        const newStatus = s.source === "Complimentary" ? "Complimentary" : "Active";
        const updated = {
          ...s,
          subscriptionEnd: newExpiry,
          status: s.status === "Expired" ? newStatus : s.status, // reactivate if expired
          activityHistory: [
            ...(s.activityHistory || []),
            { date: new Date().toISOString().split("T")[0], action: "Validity Extended", note }
          ],
          renewalHistory: [
            ...(s.renewalHistory || []),
            { date: new Date().toISOString().split("T")[0], planName: s.planName, expiryDate: newExpiry }
          ]
        };
        setSelectedSub(updated);
        return updated;
      }
      return s;
    });

    setSubscribers(updatedSubscribers);
    setShowExtendSub(false);
  };

  // Convert Complimentary -> Paid
  const handleConvertPaid = () => {
    if (!selectedSub) return;
    const activeMonthlyPrice = plans.find(p => p.id === "2")?.priceIndia || 199;
    const updatedSubscribers = subscribers.map(s => {
      if (s.id === selectedSub.id) {
        const updated: Subscriber = {
          ...s,
          status: "Active",
          source: "Purchased",
          totalSpent: s.totalSpent + activeMonthlyPrice,
          activityHistory: [
            ...(s.activityHistory || []),
            { date: new Date().toISOString().split("T")[0], action: "Converted to Paid", note: `Converted to paid plan. Charged ${activeMonthlyPrice}` }
          ],
          paymentHistory: [
            ...(s.paymentHistory || []),
            { date: new Date().toISOString().split("T")[0], amount: activeMonthlyPrice, method: "Manual Payment Entry", status: "Success" }
          ]
        };
        setSelectedSub(updated);
        return updated;
      }
      return s;
    });
    setSubscribers(updatedSubscribers);
  };

  // Cancel Subscription
  const handleCancelSub = () => {
    if (!selectedSub) return;
    if (!confirm("Are you sure you want to cancel this subscription? The user can still read until the end date.")) return;
    
    const updatedSubscribers = subscribers.map(s => {
      if (s.id === selectedSub.id) {
        const updated: Subscriber = {
          ...s,
          status: "Cancelled",
          activityHistory: [
            ...(s.activityHistory || []),
            { date: new Date().toISOString().split("T")[0], action: "Subscription Cancelled", note: "Cancelled by Admin. Access remains valid until expiry date." }
          ]
        };
        setSelectedSub(updated);
        return updated;
      }
      return s;
    });
    setSubscribers(updatedSubscribers);
  };

  // Revoke Access
  const handleRevokeAccess = () => {
    if (!selectedSub) return;
    if (!confirm("CRITICAL: This will immediately end the user's access and set status to Expired. Continue?")) return;

    const updatedSubscribers = subscribers.map(s => {
      if (s.id === selectedSub.id) {
        const updated: Subscriber = {
          ...s,
          status: "Expired",
          subscriptionEnd: new Date().toISOString().split("T")[0],
          activityHistory: [
            ...(s.activityHistory || []),
            { date: new Date().toISOString().split("T")[0], action: "Access Revoked", note: "Access immediately revoked by Admin." }
          ]
        };
        setSelectedSub(updated);
        return updated;
      }
      return s;
    });
    setSubscribers(updatedSubscribers);
  };

  // Change Plan Handler
  const handleChangePlan = (planId: string) => {
    if (!selectedSub) return;
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const expiryDate = calculateExpiry(plan.durationDays);
    const updatedSubscribers = subscribers.map(s => {
      if (s.id === selectedSub.id) {
        const updated: Subscriber = {
          ...s,
          planName: plan.name,
          subscriptionEnd: expiryDate,
          status: "Active",
          activityHistory: [
            ...(s.activityHistory || []),
            { date: new Date().toISOString().split("T")[0], action: "Plan Changed", note: `Changed plan to ${plan.name} (Valid until ${expiryDate})` }
          ]
        };
        setSelectedSub(updated);
        return updated;
      }
      return s;
    });
    setSubscribers(updatedSubscribers);
    alert(`Plan changed to ${plan.name}`);
  };

  // Get active subscribers count
  const activeSubsCount = subscribers.filter(s => s.status === "Active" || s.status === "Complimentary").length;
  const compSubsCount = subscribers.filter(s => s.status === "Complimentary").length;
  
  // Calculate subscriptions expiring this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const expiringSoonCount = subscribers.filter(s => {
    if (s.status !== "Active" && s.status !== "Complimentary") return false;
    const end = new Date(s.subscriptionEnd);
    return end.getMonth() === currentMonth && end.getFullYear() === currentYear;
  }).length;

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header — title + buttons on same row, subtitle below */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Subscription Management Console</h1>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowCreatePlan(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card rounded-lg hover:bg-muted font-medium text-sm transition-all"
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
              Create Plan
            </button>
            <button
              onClick={() => setShowAssignSub(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-[11px] font-semibold uppercase tracking-wider text-[#64748B] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <UserPlus className="w-4 h-4" />
              Assign Subscription
            </button>
          </div>
        </div>
        <p className="text-sm text-[#43474e] font-normal leading-5">Create pricing structures, assign manual/complimentary access, and monitor membership lifecycles.</p>
      </div>

      {/* Analytics dashboard Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <MetricCard
          label="Active Subscribers"
          value={activeSubsCount}
          iconPaths={[
            { d: "M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21", stroke: "#002045" },
            { d: "M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z", stroke: "#002045" },
            { d: "M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13", stroke: "#002045" },
            { d: "M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88", stroke: "#002045" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(0,32,69,0.12) 0%, rgba(0,32,69,0.04) 100%)"
          subtitle="Paid subscribers"
          showIcon={false}
        />
        <MetricCard
          label="Complimentary Access"
          value={compSubsCount}
          iconPaths={[
            { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z", stroke: "#1B5E20" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0.04) 100%)"
          subtitle="Free access granted"
          showIcon={false}
        />
        <MetricCard
          label="Expiring This Month"
          value={expiringSoonCount}
          iconPaths={[
            { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", stroke: "#BA1A1A" },
            { d: "M12 9V13", stroke: "#BA1A1A" },
            { d: "M12 17H12.01", stroke: "#BA1A1A" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(186,26,26,0.12) 0%, rgba(186,26,26,0.04) 100%)"
          subtitle="Need renewal attention"
          showIcon={false}
          valueColor="#b45309"
        />
        <MetricCard
          label="Est. Monthly Revenue"
          value="₹24,850"
          iconPaths={[
            { d: "M12 2V22", stroke: "#1B5E20" },
            { d: "M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6", stroke: "#1B5E20" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0.04) 100%)"
          subtitle="MRR estimate"
          showIcon={false}
        />
        <MetricCard
          label="Est. Yearly Revenue"
          value="₹298,200"
          iconPaths={[
            { d: "M12 2V22", stroke: "#1B5E20" },
            { d: "M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6", stroke: "#1B5E20" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0.04) 100%)"
          subtitle="ARR estimate"
          showIcon={false}
        />
      </div>

      {/* Modern underline tab bar — standalone */}
      <div className="flex border-b border-border">
        {([
          { key: "subscribers" as const, label: "Subscribers", count: subscribers.length },
          { key: "plans" as const, label: "Membership Plans", count: plans.length },
        ]).map(({ key, label, count }) => {
          const isActive = activeSubTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`relative flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                isActive ? "text-[#002045]" : "text-[#43474e]/70 hover:text-[#191c1e]"
              }`}
            >
              {label}
              <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full transition-colors ${
                isActive ? "bg-[#002045] text-white" : "bg-[#F8FAFC] text-[#43474e]"
              }`}>
                {count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#002045] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {activeSubTab === "plans" && (
        <div className="mt-5">
          <div className="bg-card border border-border rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
          <div>
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
              <Crown className="w-5 h-5 text-[var(--color-saffron)]" />
              Configured Membership Plans
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Define billing structures for the library applications.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-border p-1.5 rounded-lg text-xs">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={activeRegionId}
              onChange={(e) => setActiveRegionId(e.target.value)}
              className="bg-transparent font-semibold border-none focus:outline-none focus:ring-0 text-foreground cursor-pointer"
            >
              {pricingGroups.map(g => (
                <option key={g.id} value={g.id} className="bg-card">
                  {g.name} ({g.currencySymbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((plan) => {
            const displayPrice = plan.prices?.[activeRegionId] !== undefined
              ? plan.prices[activeRegionId]
              : (activeRegionId === "india" ? plan.priceIndia : calculateAutoPrice(activeGroup, plan.durationDays, plan.priceIndia));
            
            return (
              <div
                key={plan.id}
                className={`border rounded-xl p-5 flex flex-col justify-between transition-all bg-card hover:shadow-md relative group border-[#E2E8F0] ${
                  plan.status === "Archived" ? "opacity-60 border-dashed border-border" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      plan.status === "Active" ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                    }`}>
                      {plan.status}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{plan.durationDays} Days</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{plan.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{plan.description}</p>
                </div>
                
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-foreground">
                      {activeGroup.currencySymbol}{displayPrice}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium">/{plan.durationDays}d</span>
                  </div>
                </div>

                {/* Inline plan actions */}
                <div className="absolute inset-0 bg-background/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      const newPrice = prompt(`Enter new price for ${activeGroup.name} (${activeGroup.currencySymbol}):`, String(displayPrice));
                      if (newPrice && !isNaN(parseFloat(newPrice))) {
                        setPlans(plans.map(p => {
                          if (p.id === plan.id) {
                            const updatedPrices = { ...(p.prices || {}) };
                            updatedPrices[activeRegionId] = parseFloat(newPrice);
                            return {
                              ...p,
                              prices: updatedPrices,
                              priceIndia: activeRegionId === "india" ? parseFloat(newPrice) : p.priceIndia,
                            };
                          }
                          return p;
                        }));
                      }
                    }}
                    className="px-2 py-1 bg-card border border-border rounded text-xs font-semibold hover:bg-muted"
                  >
                    Edit Price
                  </button>
                  <button
                    onClick={() => {
                      const action = plan.status === "Archived" ? "Active" : "Archived";
                      setPlans(plans.map(p => p.id === plan.id ? { ...p, status: action } : p));
                    }}
                    className="px-2 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded text-xs font-semibold hover:bg-destructive hover:text-white"
                  >
                    {plan.status === "Archived" ? "Restore" : "Archive"}
                  </button>
                </div>
              </div>
            );
          })}
          {/* Dash Card for Creating Plan */}
          <button
            type="button"
            onClick={() => setShowCreatePlan(true)}
            className="border-2 border-dashed border-[#E2E8F0] hover:border-[var(--color-saffron)] hover:bg-muted/15 rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all min-h-[140px] text-muted-foreground hover:text-[var(--color-saffron)] text-sm font-semibold"
          >
            <Plus className="w-6 h-6" />
            <span>Create New Plan</span>
          </button>
        </div>
          </div>
        </div>
      )}

      {activeSubTab === "subscribers" && (
        <div className="mt-5">
          <div className="bg-card border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-border space-y-3">
        {/* Primary: Search + toggle */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474e]/60 transition-colors group-focus-within:text-[#002045]" />
            <input
              type="text"
              placeholder="Search subscriber name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setShowMoreFilters(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg hover:bg-muted transition-colors whitespace-nowrap ${showMoreFilters ? "bg-muted text-foreground" : "bg-white text-foreground/70"}`}
          >
            {showMoreFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Filters
          </button>
        </div>

        {/* Secondary: Collapsible Filters */}
        {showMoreFilters && (
          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-border">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Expired">Expired Only</option>
              <option value="Cancelled">Cancelled Only</option>
              <option value="Complimentary">Complimentary Only</option>
              <option value="Pending">Pending Only</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Plans</option>
              {plans.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
              <option value="Complimentary Access">Complimentary</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Sources</option>
              <option value="Purchased">Purchased</option>
              <option value="Complimentary">Complimentary</option>
              <option value="Admin Assigned">Admin Assigned</option>
              <option value="Promotional">Promotional</option>
            </select>

            <select
              value={expiryFilter}
              onChange={(e) => setExpiryFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Expiries</option>
              <option value="7days">Expiring in 7 Days</option>
              <option value="30days">Expiring in 30 Days</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={pricingGroupFilter}
              onChange={(e) => setPricingGroupFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Pricing Groups</option>
              {pricingGroups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 cursor-pointer text-foreground"
            >
              <option value="All">All Countries</option>
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg text-xs font-bold transition-all bg-white cursor-pointer text-[#191c1e]"
              title="Export filtered subscribers to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export CSV
            </button>
          </div>
        )}
            </div>
            <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Subscriber</th>
                <th className="px-6 py-3.5 font-semibold">Email</th>
                <th className="px-6 py-3.5 font-semibold">Country</th>
                <th className="px-6 py-3.5 font-semibold">Plan</th>
                <th className="px-6 py-3.5 font-semibold">Source</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Valid Until</th>
                <th className="px-6 py-3.5 font-semibold">Assigned By</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="/40 text-sm">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-muted-foreground italic bg-card">
                    No subscribers found matching the filters
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-muted/5 transition-all">
                    <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">{sub.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">{sub.email}</td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{sub.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{sub.planName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sourceConfig[sub.source]?.color || "bg-[#F1F5F9] text-[#475569]"}`}>
                        {sub.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${subscriptionConfig[sub.status]?.color || "bg-[#F1F5F9] text-[#475569]"}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-foreground/80 whitespace-nowrap">{sub.subscriptionEnd}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">{sub.assignedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors inline-block"
                        title="View details & logs"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PLAN MODAL */}
      {showCreatePlan && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreatePlanSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[var(--color-saffron)]" />
                Configure New Plan
              </h3>
              <button
                type="button"
                onClick={() => setShowCreatePlan(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Plan Name</label>
              <input
                type="text"
                required
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                placeholder="e.g. Quarterly Plan"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Billing Duration</label>
                <select
                  value={newPlanDuration}
                  onChange={(e) => setNewPlanDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20 cursor-pointer"
                >
                  <option value="7">7 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                  <option value="180">180 Days</option>
                  <option value="365">365 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Plan Status</label>
                <select
                  value={newPlanStatus}
                  onChange={(e) => setNewPlanStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20 cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="space-y-5 pt-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Plan Pricing (Auto-linked to Pricing Models)</label>
              <div className="grid grid-cols-2 gap-3 bg-[#FAFAFA] p-3 rounded-lg border border-[#E2E8F0]">
                {pricingGroups.map(group => {
                  const autoVal = calculateAutoPrice(group, parseInt(newPlanDuration) || 30);
                  
                  return (
                    <div key={group.id} className="col-span-1">
                      <label className="block text-[10px] font-semibold text-muted-foreground uppercase mb-1">
                        {group.name} ({group.currencySymbol})
                      </label>
                      <input
                        type="number"
                        step={group.currency === "INR" ? "1" : "0.01"}
                        placeholder={String(autoVal)}
                        value={newPlanPrices[group.id] || ""}
                        onChange={(e) => {
                          setNewPlanPrices({
                            ...newPlanPrices,
                            [group.id]: e.target.value
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-background border border-border rounded-lg text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
                      />
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground italic">Leave fields empty to keep auto-linked pricing based on monthly/yearly models.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Description</label>
              <textarea
                value={newPlanDesc}
                onChange={(e) => setNewPlanDesc(e.target.value)}
                placeholder="List benefits or duration notes..."
                rows={2}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowCreatePlan(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
              >
                Create Plan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ASSIGN SUBSCRIPTION MODAL */}
      {showAssignSub && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAssignSubSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[var(--color-saffron)]" />
                Assign Manual Subscription
              </h3>
              <button
                type="button"
                onClick={handleCloseAssignSub}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target User Segment */}
            <div className="bg-muted/15 border border-[#E2E8F0] p-4 rounded-xl space-y-3 bg-card">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-bold text-foreground">Target Subscriber</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="radio"
                      name="usermode"
                      checked={assignUserMode === "existing"}
                      onChange={() => setAssignUserMode("existing")}
                      className="w-3.5 h-3.5 border-border"
                    />
                    Existing User
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="radio"
                      name="usermode"
                      checked={assignUserMode === "new"}
                      onChange={() => setAssignUserMode("new")}
                      className="w-3.5 h-3.5 border-border"
                    />
                    Create New
                  </label>
                </div>
              </div>

              {assignUserMode === "existing" ? (
                <div>
                  <select
                    value={selectedUserEmail}
                    onChange={(e) => setSelectedUserEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20 cursor-pointer"
                  >
                    <option value="">Select Existing Subscriber...</option>
                    {subscribers.map(sub => (
                      <option key={sub.id} value={sub.email}>
                        {sub.name} ({sub.email})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 md:col-span-1">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Country (e.g. India, United States)"
                      required
                      value={newUserCountry}
                      onChange={(e) => setNewUserCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Assignment Configuration */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Subscription Assignment Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="assignType"
                      checked={assignType === "plan"}
                      onChange={() => setAssignType("plan")}
                      className="w-4 h-4 border-border text-[var(--color-institutional-blue)]"
                    />
                    Existing Subscription Plan
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="assignType"
                      checked={assignType === "complimentary"}
                      onChange={() => setAssignType("complimentary")}
                      className="w-4 h-4 border-border text-[var(--color-institutional-blue)]"
                    />
                    Complimentary Access
                  </label>
                </div>
              </div>

              {assignType === "plan" ? (
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Select Paid Plan</label>
                  <select
                    value={assignPlanId}
                    onChange={(e) => setAssignPlanId(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.durationDays} Days - ₹{p.priceIndia} / ROW: ${convertPrice(p.priceIndia, 4.18, "USD").toFixed(2)})</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1.5">Note: Expiration date is auto-calculated based on plan duration.</p>
                </div>
              ) : (
                <div className="space-y-4 p-4 border border-[#E2E8F0] rounded-xl bg-card">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Validity Mode</label>
                      <div className="flex gap-3 mt-1.5">
                        <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer font-medium">
                          <input
                            type="radio"
                            name="compValidity"
                            checked={compValidityMode === "days"}
                            onChange={() => setCompValidityMode("days")}
                            className="w-3.5 h-3.5 border-border"
                          />
                          Number of Days
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer font-medium">
                          <input
                            type="radio"
                            name="compValidity"
                            checked={compValidityMode === "date"}
                            onChange={() => setCompValidityMode("date")}
                            className="w-3.5 h-3.5 border-border"
                          />
                          Specific Date
                        </label>
                      </div>
                    </div>

                    {compValidityMode === "days" ? (
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Days Valid</label>
                        <input
                          type="number"
                          value={compDays}
                          onChange={(e) => setCompDays(e.target.value)}
                          min="1"
                          placeholder="e.g. 90"
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/20"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Access Until Date</label>
                        <input
                          type="date"
                          value={compDate}
                          onChange={(e) => setCompDate(e.target.value)}
                          className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E2E8F0]">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Source Type</label>
                      <select
                        value={assignSource}
                        onChange={(e) => setAssignSource(e.target.value as any)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="Complimentary">Complimentary</option>
                        <option value="Admin Assigned">Admin Assigned</option>
                        <option value="Promotional">Promotional</option>
                      </select>
                    </div>

                    {assignSource === "Promotional" && (
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Campaign Access</label>
                        <select
                          value={promoCampaign}
                          onChange={(e) => setPromoCampaign(e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                        >
                          <option value="Amma Event Access">Amma Event Access</option>
                          <option value="Book Launch Access">Book Launch Access</option>
                          <option value="Volunteer Access">Volunteer Access</option>
                          <option value="Ashram Member Access">Ashram Member Access</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Invoice Upload Container */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <label className="block text-xs font-semibold text-foreground">Upload Manual Invoice</label>
              <div
                className="border-2 border-dashed border-[#D1D5DC] hover:border-[var(--color-saffron)]/50 rounded-lg p-5 text-center bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-all cursor-pointer relative"
                onClick={() => assignFileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={assignFileInputRef}
                  onChange={handleAssignInvoiceUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {assignInvoiceFile ? (
                  <div className="flex items-center justify-between bg-white border border-[#E2E8F0] p-3 rounded-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#DCFCE7] text-[#15803D] rounded flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-sm truncate max-w-[280px] text-foreground">{assignInvoiceFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(assignInvoiceFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveAssignInvoice}
                      className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-semibold text-[#191c1e] mb-1">Click to upload or drag & drop invoice</p>
                    <p className="text-xs text-muted-foreground">PDF, PNG, or JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={handleCloseAssignSub}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
              >
                Assign Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EXTEND VALIDITY POPUP IN SUB DETAIL */}
      {showExtendSub && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[var(--color-saffron)]" />
                Extend Subscription Validity
              </h3>
              <button
                onClick={() => setShowExtendSub(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-4">
                Choose extension duration for <strong className="text-foreground">{selectedSub?.name}</strong>. Current Expiry is <strong className="font-mono text-foreground">{selectedSub?.subscriptionEnd}</strong>.
              </p>

              <label className="block text-sm font-medium mb-1.5 text-foreground">Select Extension</label>
              <select
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
              >
                <option value="7">+7 Days</option>
                <option value="30">+30 Days</option>
                <option value="90">+90 Days</option>
                <option value="180">+180 Days</option>
                <option value="365">+365 Days</option>
                <option value="custom">Custom Date picker</option>
              </select>
            </div>

            {extensionDays === "custom" && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Choose Expiry Date</label>
                <input
                  type="date"
                  value={customExpiryDate}
                  onChange={(e) => setCustomExpiryDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-pointer"
                />
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setShowExtendSub(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExtendExpiry}
                className="flex-1 px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
              >
                Extend Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBSCRIBER DETAILS DRAWER/MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl p-8 w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[var(--color-institutional-blue)]/10 rounded-xl text-[var(--color-institutional-blue)]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">Subscriber Management Details</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Comprehensive history, payment logs, and lifecycle controls.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* User Profile */}
              <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-5 rounded-xl space-y-4">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  User Profile Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Subscriber Name</p>
                    <p className="font-semibold text-foreground mt-0.5">{selectedSub.name}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Email Address</p>
                    <p className="font-mono text-xs text-foreground/80 mt-0.5">{selectedSub.email}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Country/Region</p>
                    <p className="text-foreground/80 mt-0.5 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      {selectedSub.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Library Count</p>
                    <p className="text-foreground/80 mt-0.5">{selectedSub.libraryCount} Books Purchased</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Total Revenue Contributed</p>
                    <p className="font-bold text-[var(--color-success-green-dark)] mt-0.5">
                      {selectedSub.country === "India" ? "₹" : "$"}{selectedSub.totalSpent.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-5 rounded-xl space-y-4">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  Subscription Metadata & Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Current Plan</p>
                    <p className="font-semibold text-foreground mt-0.5">{selectedSub.planName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Lifecycle Status</p>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-0.5 ${subscriptionConfig[selectedSub.status]?.color || "bg-[#F1F5F9] text-[#475569]"}`}>
                      {selectedSub.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Access Granted By</p>
                    <p className="text-foreground/80 mt-0.5">{selectedSub.assignedBy}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Billing/Source</p>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-0.5 ${sourceConfig[selectedSub.source]?.color || "bg-[#F1F5F9] text-[#475569]"}`}>
                      {selectedSub.source}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 bg-background border border-border p-3 rounded-lg mt-2">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>Validity Period: <strong className="font-mono text-foreground">{selectedSub.subscriptionStart}</strong> to <strong className="font-mono text-foreground">{selectedSub.subscriptionEnd}</strong></span>
                  </div>

                  {selectedSub.invoiceFile && (
                    <div className="col-span-2 border border-[#E2E8F0] p-3 rounded-lg bg-white space-y-2 mt-2">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Manual Invoice</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs truncate max-w-[200px] text-foreground">{selectedSub.invoiceFile.name}</p>
                            <p className="text-[10px] text-muted-foreground">{(selectedSub.invoiceFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewInvoiceFile(selectedSub.invoiceFile || null)}
                          className="px-2.5 py-1.5 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white text-xs font-semibold rounded transition-all flex items-center gap-1 cursor-pointer border-none"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Invoice
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Logs/Histories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Payment History */}
              <div className="bg-card border border-[#E2E8F0] p-4 rounded-xl space-y-3 shadow-inner">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  Payments Log
                </h4>
                {selectedSub.paymentHistory && selectedSub.paymentHistory.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {selectedSub.paymentHistory.map((pay, i) => (
                      <div key={i} className="text-xs p-2 bg-[#F8FAFC] border border-border/45 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{selectedSub.country === "India" ? "₹" : "$"}{pay.amount}</p>
                          <p className="text-[10px] text-muted-foreground">{pay.date} • {pay.method}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/15 px-1.5 py-0.5 rounded">{pay.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic p-4 text-center">No payment entries found</p>
                )}
              </div>

              {/* Renewal History */}
              <div className="bg-card border border-[#E2E8F0] p-4 rounded-xl space-y-3 shadow-inner">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                  <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                  Renewal History
                </h4>
                {selectedSub.renewalHistory && selectedSub.renewalHistory.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {selectedSub.renewalHistory.map((ren, i) => (
                      <div key={i} className="text-xs p-2 bg-[#F8FAFC] border border-border/45 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-foreground">{ren.planName}</strong>
                          <span className="font-mono text-[10px] text-muted-foreground">{ren.date}</span>
                        </div>
                        <p className="text-muted-foreground text-[10px]">Valid Until: {ren.expiryDate}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic p-4 text-center">No renewals recorded</p>
                )}
              </div>

              {/* Activity History */}
              <div className="bg-card border border-[#E2E8F0] p-4 rounded-xl space-y-3 shadow-inner">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                  <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                  Activity & Audit History
                </h4>
                {selectedSub.activityHistory && selectedSub.activityHistory.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {selectedSub.activityHistory.map((act, i) => (
                      <div key={i} className="text-xs p-2 bg-[#F8FAFC] border border-border/45 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-foreground">{act.action}</strong>
                          <span className="font-mono text-[10px] text-muted-foreground">{act.date}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">{act.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic p-4 text-center">No activity history recorded</p>
                )}
              </div>
            </div>

            {/* Admin Lifecycle Controls Panel */}
            <div className="pt-5 border-t border-border space-y-3">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                Administrative Lifecycle Operations
              </h3>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowExtendSub(true)}
                  className="px-4 py-2 border border-border bg-card hover:bg-muted text-sm font-semibold rounded-lg transition-all"
                >
                  Extend Validity
                </button>

                {/* Change plan select option */}
                <div className="relative">
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) handleChangePlan(e.target.value);
                      e.target.value = "";
                    }}
                    className="px-4 py-2 border border-border bg-card hover:bg-muted text-sm font-semibold rounded-lg transition-all cursor-pointer focus:outline-none text-foreground"
                  >
                    <option value="">Change Active Plan...</option>
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {selectedSub.status === "Complimentary" && (
                  <button
                    onClick={handleConvertPaid}
                    className="px-4 py-2 border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500 hover:text-white text-sm font-semibold rounded-lg transition-all"
                  >
                    Convert to Paid Plan
                  </button>
                )}

                {selectedSub.status !== "Cancelled" && selectedSub.status !== "Expired" && (
                  <button
                    onClick={handleCancelSub}
                    className="px-4 py-2 border border-border hover:border-destructive hover:text-destructive text-sm font-semibold rounded-lg transition-all bg-card"
                  >
                    Cancel Subscription
                  </button>
                )}

                {selectedSub.status !== "Expired" && (
                  <button
                    onClick={handleRevokeAccess}
                    className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20 text-sm font-semibold rounded-lg transition-all"
                  >
                    Revoke Access Immediately
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedSub(null)}
              className="w-full py-2.5 bg-muted border border-border rounded-xl hover:bg-muted/80 text-sm font-semibold text-foreground transition-all mt-4"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal Overlay */}
      {previewInvoiceFile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-3xl shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-saffron)]" />
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] truncate max-w-[500px]">
                  Invoice Preview: {previewInvoiceFile.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewInvoiceFile(null)}
                className="p-1 hover:bg-muted rounded-lg border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-[#F8FAFC] rounded-lg border border-border p-4 min-h-[300px]">
              {previewInvoiceFile.type.startsWith("image/") || 
               /\.(jpg|jpeg|png|gif|webp)$/i.test(previewInvoiceFile.name) ? (
                <img
                  src={previewInvoiceFile.dataUrl}
                  alt={previewInvoiceFile.name}
                  className="max-w-full max-h-[60vh] object-contain rounded shadow-sm"
                />
              ) : previewInvoiceFile.type === "application/pdf" || 
                  /\.(pdf)$/i.test(previewInvoiceFile.name) ? (
                <iframe
                  src={previewInvoiceFile.dataUrl}
                  className="w-full h-[60vh] rounded-lg border border-border bg-white"
                  title={previewInvoiceFile.name}
                />
              ) : (
                <div className="text-center p-8">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1">Preview not available for this file type</p>
                  <p className="text-xs text-muted-foreground">You can download it to view locally</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0] flex-shrink-0">
              <a
                href={previewInvoiceFile.dataUrl}
                download={previewInvoiceFile.name}
                className="px-4 py-2 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center text-center cursor-pointer decoration-none"
              >
                Download Invoice
              </a>
              <button
                type="button"
                onClick={() => setPreviewInvoiceFile(null)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-foreground transition-all cursor-pointer bg-card"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
